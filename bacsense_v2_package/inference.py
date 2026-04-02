
# =============================================================================
# BacSense v2 — Standalone Inference Module
# =============================================================================
# Usage:
#   from inference import BacSense
#   model = BacSense("path/to/bacsense_v2_package")
#   result = model.predict("image.png")
#   print(result["prediction"])
# =============================================================================

import pickle, cv2, warnings
import numpy as np
from pathlib import Path
from PIL import Image

warnings.filterwarnings("ignore")


def _lazy_imports():
    from scipy.stats import skew
    from skimage.feature import local_binary_pattern, graycomatrix, graycoprops
    from keras.models import load_model
    return skew, local_binary_pattern, graycomatrix, graycoprops, load_model


class BacSense:
    """
    BacSense v2 — Two-stage cascaded bacterial classifier.

    Stage 1 : VGG16 + PCA(94)  + RBF-SVM  →  5-class prediction
    Stage 2 : VGG16 + 171-dim handcrafted features + PCA(243) + RBF-SVM
              (only for E. coli / P. aeruginosa confusion pair)

    Feature vector (Stage 2): 683-dim
      VGG16(512) + HSV histogram(48) + Morphological(5) + LBP(59)
      + GLCM(24) + Channel stats(9) + Density grid(16)
      + Hu moments(7) + Curvature(3)

    Performance:
      Overall accuracy  : 95.65%
      E. coli F1        : 0.9568
      P. aeruginosa F1  : 0.9563
      ROC-AUC           : 0.9863
    """

    SPECIES_INFO = {
        "Escherichia coli":        {"gram": "Negative", "shape": "Rod",    "risk": "High"},
        "Pseudomonas aeruginosa":  {"gram": "Negative", "shape": "Rod",    "risk": "High"},
        "Enterococcus faecalis":   {"gram": "Positive", "shape": "Coccus", "risk": "Medium"},
        "Clostridium perfringens": {"gram": "Positive", "shape": "Rod",    "risk": "High"},
        "Listeria monocytogenes":  {"gram": "Positive", "shape": "Rod",    "risk": "High"},
    }

    AMBIGUOUS = ["Escherichia coli", "Pseudomonas aeruginosa"]

    def __init__(self, model_dir: str, specialist_threshold: float = 0.90):
        """
        Args:
            model_dir            : path to folder containing all model files
            specialist_threshold : min specialist confidence to accept (default 0.90)
        """
        self.model_dir = Path(model_dir)
        self.threshold = specialist_threshold
        self._loaded   = False

    def _load(self):
        if self._loaded:
            return
        print("Loading BacSense v2 models...")
        skew, lbp_fn, graycomatrix, graycoprops, load_model = _lazy_imports()
        self._skew         = skew
        self._lbp_fn       = lbp_fn
        self._graycomatrix = graycomatrix
        self._graycoprops  = graycoprops

        d = self.model_dir
        self.feature_extractor = load_model(str(d / "vgg16_feature_extractor.keras"))
        with open(d / "pca_model.pkl",          "rb") as f: self.pca         = pickle.load(f)
        with open(d / "standard_scaler.pkl",    "rb") as f: self.scaler      = pickle.load(f)
        with open(d / "svm_classifier.pkl",     "rb") as f: self.main_svm    = pickle.load(f)
        with open(d / "class_names.pkl",        "rb") as f: self.class_names = pickle.load(f)
        with open(d / "specialist_svm.pkl",     "rb") as f: self.spec_svm    = pickle.load(f)
        with open(d / "specialist_scaler.pkl",  "rb") as f: self.spec_scaler = pickle.load(f)
        with open(d / "specialist_pca.pkl",     "rb") as f: self.spec_pca    = pickle.load(f)
        self._loaded = True
        print("  All models loaded ✅")

    # ── Feature extractors ─────────────────────────────────────────

    def _hsv_histogram(self, img_path, bins=(4, 4, 3)):
        img  = cv2.imread(str(img_path))
        hsv  = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist([hsv], [0,1,2], None, list(bins), [0,180,0,256,0,256])
        return cv2.normalize(hist, hist).flatten()  # 48

    def _morphological(self, img_path):
        img  = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
        blur = cv2.GaussianBlur(img, (5,5), 0)
        _,thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        contours,_ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours: return np.zeros(5)
        c     = max(contours, key=cv2.contourArea)
        area  = cv2.contourArea(c)
        perim = cv2.arcLength(c, True)
        circ  = 4*np.pi*area / (perim**2+1e-6)
        x,y,w,h = cv2.boundingRect(c)
        aspect   = w / (h+1e-6)
        solidity = area / (cv2.contourArea(cv2.convexHull(c))+1e-6)
        return np.array([area, perim, circ, aspect, solidity])  # 5

    def _lbp(self, img_path, P=8, R=1, n_bins=59):
        img  = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
        img  = cv2.resize(img, (128,128))
        lbp  = self._lbp_fn(img, P, R, method="uniform")
        hist,_ = np.histogram(lbp.ravel(), bins=n_bins, range=(0,n_bins))
        hist = hist.astype(float); hist /= (hist.sum()+1e-6)
        return hist  # 59

    def _glcm(self, img_path):
        img  = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
        img  = cv2.resize(img, (128,128))
        img  = (img//4).astype(np.uint8)
        angles = [0, np.pi/4, np.pi/2, 3*np.pi/4]
        glcm = self._graycomatrix(img, distances=[1], angles=angles,
                                   levels=64, symmetric=True, normed=True)
        feats = []
        for prop in ["contrast","dissimilarity","homogeneity",
                     "energy","correlation","ASM"]:
            feats.extend(self._graycoprops(glcm, prop).flatten())
        return np.array(feats)  # 24

    def _channel_stats(self, img_path):
        img = cv2.imread(str(img_path))
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(float)
        feats = []
        for ch in range(3):
            d = hsv[:,:,ch].ravel()
            feats.extend([d.mean(), d.std(), self._skew(d)])
        return np.array(feats)  # 9

    def _density_grid(self, img_path, grid=4):
        img  = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
        img  = cv2.resize(img, (128,128))
        _,thresh = cv2.threshold(
            cv2.GaussianBlur(img,(5,5),0), 0, 255,
            cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        h,w = thresh.shape; gh,gw = h//grid, w//grid
        return np.array([
            thresh[i*gh:(i+1)*gh, j*gw:(j+1)*gw].mean()/255.0
            for i in range(grid) for j in range(grid)
        ])  # 16

    def _hu_moments(self, img_path):
        img  = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
        img  = cv2.resize(img, (128,128))
        _,thresh = cv2.threshold(
            cv2.GaussianBlur(img,(5,5),0), 0, 255,
            cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        hu = cv2.HuMoments(cv2.moments(thresh)).flatten()
        return -np.sign(hu) * np.log10(np.abs(hu)+1e-10)  # 7

    def _curvature(self, img_path):
        img  = cv2.imread(str(img_path), cv2.IMREAD_GRAYSCALE)
        _,thresh = cv2.threshold(
            cv2.GaussianBlur(img,(5,5),0), 0, 255,
            cv2.THRESH_BINARY+cv2.THRESH_OTSU)
        contours,_ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        if not contours: return np.zeros(3)
        curvatures = []
        for c in contours:
            if len(c) < 5: continue
            pts = c[:,0,:].astype(float)
            for i in range(1, len(pts)-1):
                v1 = pts[i]-pts[i-1]; v2 = pts[i+1]-pts[i]
                cross = abs(v1[0]*v2[1]-v1[1]*v2[0])
                curvatures.append(cross/(np.linalg.norm(v1)*np.linalg.norm(v2)+1e-6))
        if not curvatures: return np.zeros(3)
        curv = np.array(curvatures)
        return np.array([curv.mean(), curv.std(), curv.max()])  # 3

    def _rich_features(self, img_path):
        return np.concatenate([
            self._hsv_histogram(img_path),    # 48
            self._morphological(img_path),    # 5
            self._lbp(img_path),              # 59
            self._glcm(img_path),             # 24
            self._channel_stats(img_path),    # 9
            self._density_grid(img_path),     # 16
            self._hu_moments(img_path),       # 7
            self._curvature(img_path),        # 3
        ])  # 171 total

    # ── Public API ─────────────────────────────────────────────────

    def predict(self, img_path: str, verbose: bool = False) -> dict:
        """
        Classify a bacterial microscopy image.

        Returns dict:
            prediction           : str    species name
            confidence           : float  0-1
            routed_to_specialist : bool
            specialist_accepted  : bool
            main_prediction      : str
            gram                 : str    Positive / Negative
            shape                : str    Rod / Coccus
            risk                 : str    High / Medium / Low
        """
        self._load()
        img_path = str(img_path)

        # Stage 1 — Main SVM (5-class)
        img = Image.open(img_path).convert("RGB").resize((128,128), Image.LANCZOS)
        arr = np.expand_dims(np.array(img).astype("float32")/255.0, axis=0)

        vgg        = self.feature_extractor.predict(arr, verbose=0)
        scaled     = self.scaler.transform(self.pca.transform(vgg))
        main_pred  = self.main_svm.predict(scaled)[0]
        main_class = self.class_names[main_pred]
        main_conf  = float(np.max(self.main_svm.decision_function(scaled)[0]))

        if verbose:
            print(f"Stage 1 — Main SVM: {main_class} (score: {main_conf:.4f})")

        result = {
            "prediction": main_class, "confidence": main_conf,
            "routed_to_specialist": False, "specialist_accepted": False,
            "main_prediction": main_class,
            **self.SPECIES_INFO.get(main_class, {"gram":"Unknown","shape":"Unknown","risk":"Unknown"})
        }

        # Stage 2 — Specialist (ambiguous pair only)
        if main_class in self.AMBIGUOUS:
            if verbose: print("Routing to specialist...")

            rich     = self._rich_features(img_path).reshape(1,-1)
            combined = np.concatenate([vgg, rich], axis=1)
            pca_spec   = self.spec_pca.transform(self.spec_scaler.transform(combined))
            spec_pred  = self.spec_svm.predict(pca_spec)[0]
            spec_proba = self.spec_svm.predict_proba(pca_spec)[0]
            spec_conf  = spec_proba.max()
            spec_class = "Escherichia coli" if spec_pred == 0 else "Pseudomonas aeruginosa"

            accepted = spec_conf >= self.threshold
            final    = spec_class if accepted else main_class

            if verbose:
                tag = "✅ accepted" if accepted else f"⚠️ below {self.threshold}, fallback to main"
                print(f"Stage 2 — Specialist: {spec_class} (conf: {spec_conf:.4f}) {tag}")
                print(f"Final: {final}")

            result.update({
                "prediction": final, "confidence": spec_conf,
                "routed_to_specialist": True, "specialist_accepted": accepted,
                **self.SPECIES_INFO.get(final, {"gram":"Unknown","shape":"Unknown","risk":"Unknown"})
            })

        return result

    def predict_batch(self, img_paths: list, verbose: bool = False) -> list:
        """Classify a list of image paths. Returns list of result dicts."""
        return [self.predict(p, verbose=verbose) for p in img_paths]

    def warmup(self):
        """Pre-load all models into memory (call once at app startup)."""
        self._load()
        print("BacSense v2 ready ✅")
