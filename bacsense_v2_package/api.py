"""
BacSense v2 — FastAPI Application Entry Point
==============================================
Start with:
    uvicorn api:app --host 0.0.0.0 --port 5000 --reload

From the bacsense_v2_package directory, or from the project root:
    uvicorn bacsense_v2_package.api:app --host 0.0.0.0 --port 5000 --reload
"""

import os
import tempfile
from pathlib import Path
from typing import List

import uvicorn
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from inference import BacSense

# ---------------------------------------------------------------------------
# App initialisation
# ---------------------------------------------------------------------------

app = FastAPI(
    title="BacSense v2 API",
    description=(
        "Bacterial classification API powered by a VGG16 + SVM hybrid model. "
        "Upload microscopy images to receive species predictions with clinical metadata."
    ),
    version="2.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow the Vite dev server and the production frontend domain
# ---------------------------------------------------------------------------

_raw_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000",
)
allowed_origins: List[str] = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Model — loaded once at startup, shared across all requests
# ---------------------------------------------------------------------------

# Resolve the directory that contains this file so the module works regardless
# of the working directory from which uvicorn is launched.
_MODEL_DIR = Path(__file__).parent

model = BacSense(str(_MODEL_DIR))


@app.on_event("startup")
async def _warmup() -> None:
    """Pre-load all model artefacts into memory before the first request."""
    model.warmup()


# ---------------------------------------------------------------------------
# Helper
# ---------------------------------------------------------------------------

_ACCEPTED_MIME_PREFIXES = ("image/",)
_ACCEPTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".tiff", ".tif", ".webp"}


def _validate_image(upload: UploadFile) -> None:
    """Raise HTTPException 400 if the upload does not look like an image."""
    content_type = upload.content_type or ""
    suffix = Path(upload.filename or "").suffix.lower()
    if not any(content_type.startswith(p) for p in _ACCEPTED_MIME_PREFIXES) and \
            suffix not in _ACCEPTED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{upload.filename}'. "
                   "Please upload a JPEG, PNG, or other common image format.",
        )


def _normalise_confidence(raw: float) -> float:
    """
    Convert the raw confidence value returned by BacSense.predict() to a
    0–100 percentage suitable for display.

    • The main SVM returns a decision-function score (unbounded float).
    • The specialist SVM returns predict_proba (already 0–1).

    We use a sigmoid to map decision-function scores to (0, 1) and then
    multiply by 100.  Values that are already in [0, 1] pass through the
    sigmoid with minimal distortion (sigmoid(0.9) ≈ 0.71, sigmoid(0.5) ≈ 0.62),
    so we clamp the final result to [0, 100] for safety.
    """
    import math
    normalised = 1.0 / (1.0 + math.exp(-raw))  # sigmoid → (0, 1)
    return round(min(max(normalised * 100.0, 0.0), 100.0), 2)


def _format_result(raw: dict, filename: str) -> dict:
    """Reshape a BacSense.predict() dict into the API response schema."""
    confidence_pct = _normalise_confidence(raw.get("confidence", 0.0))
    return {
        "filename": filename,
        "success": True,
        "prediction": raw.get("prediction"),
        "confidence": confidence_pct,
        "details": {
            "gram_stain": raw.get("gram", "Unknown"),
            "shape": raw.get("shape", "Unknown"),
            "pathogenicity": raw.get("risk", "Unknown"),
        },
        "meta": {
            "main_prediction": raw.get("main_prediction"),
            "routed_to_specialist": raw.get("routed_to_specialist", False),
            "specialist_accepted": raw.get("specialist_accepted", False),
        },
    }


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------


@app.get("/", tags=["Info"])
async def root() -> dict:
    """API information and available endpoints."""
    return {
        "name": "BacSense v2 API",
        "version": "2.0.0",
        "description": "Bacterial classification via VGG16 + SVM hybrid model",
        "endpoints": {
            "GET  /": "API info (this response)",
            "GET  /health": "Health check",
            "POST /predict": "Classify a single image",
            "POST /predict_batch": "Classify multiple images in one request",
        },
        "supported_species": list(BacSense.SPECIES_INFO.keys()),
    }


@app.get("/health", tags=["Info"])
async def health() -> dict:
    """Health check — returns 200 when the service is ready."""
    return {
        "status": "ok",
        "model_loaded": model._loaded,
        "version": "2.0.0",
    }


@app.post("/predict", tags=["Inference"])
async def predict(image: UploadFile = File(..., description="Microscopy image to classify")) -> dict:
    """
    Classify a single bacterial microscopy image.

    - **image**: multipart/form-data image file (JPEG, PNG, …)

    Returns species name, confidence (0–100 %), gram stain, morphology, and
    risk level.
    """
    _validate_image(image)

    suffix = Path(image.filename or "image").suffix or ".png"
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await image.read())
            tmp_path = tmp.name

        raw = model.predict(tmp_path)
        return _format_result(raw, image.filename or "image")

    except HTTPException:
        raise
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=f"Inference failed for '{image.filename}': {exc}",
        ) from exc
    finally:
        try:
            os.unlink(tmp_path)
        except Exception:  # noqa: BLE001
            pass


@app.post("/predict_batch", tags=["Inference"])
async def predict_batch(
    files: List[UploadFile] = File(..., description="One or more microscopy images"),
) -> dict:
    """
    Classify multiple bacterial microscopy images in a single request.

    - **files**: one or more multipart/form-data image files

    Returns a list of per-image results in the same order as the uploaded
    files.  Individual inference errors are captured per-file so that a
    single bad image does not fail the entire batch.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files were uploaded.")

    results = []
    tmp_paths: List[str] = []

    try:
        for upload in files:
            _validate_image(upload)
            suffix = Path(upload.filename or "image").suffix or ".png"
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                tmp.write(await upload.read())
                tmp_paths.append(tmp.name)

        for upload, tmp_path in zip(files, tmp_paths):
            try:
                raw = model.predict(tmp_path)
                results.append(_format_result(raw, upload.filename or "image"))
            except Exception as exc:  # noqa: BLE001
                results.append(
                    {
                        "filename": upload.filename or "image",
                        "success": False,
                        "error": str(exc),
                    }
                )
    finally:
        for p in tmp_paths:
            try:
                os.unlink(p)
            except Exception:  # noqa: BLE001
                pass

    return {"results": results, "total": len(results)}


# ---------------------------------------------------------------------------
# Dev entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    uvicorn.run(
        "api:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5000")),
        reload=True,
    )
