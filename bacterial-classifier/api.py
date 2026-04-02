import io
import os
import sys
import tempfile
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Add the parent directory to sys.path to import bacsense_v2_package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from bacsense_v2_package.inference import BacSense

app = FastAPI(title="Bacsense 2.0 API")

# Setup CORS to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production, e.g., ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model upon startup
# The model files are located in the bacsense_v2_package directory
model_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'bacsense_v2_package'))
classifier = BacSense(model_dir=model_dir)
classifier.warmup()

@app.get("/")
async def root():
    return {
        "service": "BacSense API",
        "version": "2.0",
        "status": "running",
        "docs": "/docs",
        "endpoints": {
            "predict": "/predict_batch (POST)",
            "health": "/health"
        }
    }


@app.get("/health")
async def health():
    return {"status": "ok", "backend": "Hugging Face Space"}


@app.post("/predict_batch")
async def predict_batch(files: List[UploadFile] = File(...)):
    if not files or len(files) == 0:
        raise HTTPException(status_code=400, detail="No files uploaded")
    
    results = []
    
    for file in files:
        temp_path = None
        try:
            # Read the uploaded file into an IO stream
            contents = await file.read()
            
            # BacSense uses cv2.imread and PIL.Image.open with a file path, so we save it to disk temporarily
            fd, temp_path = tempfile.mkstemp(suffix=".png")
            with os.fdopen(fd, 'wb') as f:
                f.write(contents)
            
            # Process the image
            result = classifier.predict(temp_path)
            
            # Format probabilities for the frontend
            # UI expects 0-100 for confidence
            confidence_pct = result["confidence"] * 100 if result["confidence"] <= 1.0 else result["confidence"]
            
            results.append({
                "filename": file.filename,
                "success": True,
                "prediction": result['prediction'],
                "confidence": confidence_pct,
                "probabilities": [
                    {"name": result['prediction'], "probability": confidence_pct}
                ],
                "details": {
                    "gram_stain": result.get("gram", "Unknown"),
                    "shape": result.get("shape", "Unknown"),
                    "pathogenicity": result.get("risk", "Unknown")
                }
            })
        except Exception as e:
            results.append({
                "filename": file.filename,
                "success": False,
                "error": str(e)
            })
        finally:
            # Clean up the temporary file
            if temp_path and os.path.exists(temp_path):
                os.remove(temp_path)
                
    return {"results": results}
