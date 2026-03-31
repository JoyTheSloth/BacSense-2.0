# =============================================================================
# BacSense v2 — Usage Examples
# pip install -r requirements.txt
# =============================================================================

from inference import BacSense

# ── Basic usage ───────────────────────────────────────────────────
model = BacSense("bacsense_v2_package")
model.warmup()  # pre-load at startup (optional but recommended)

result = model.predict("image.png", verbose=True)
print(result["prediction"])   # Escherichia coli
print(result["confidence"])   # 0.9621
print(result["gram"])         # Negative
print(result["shape"])        # Rod
print(result["risk"])         # High

# ── Batch prediction ──────────────────────────────────────────────
results = model.predict_batch(["img1.png", "img2.png", "img3.png"])
for r in results:
    print(r["prediction"], r["confidence"])

# ── Streamlit app ─────────────────────────────────────────────────
# import streamlit as st
# from inference import BacSense
#
# @st.cache_resource
# def load_model():
#     m = BacSense("bacsense_v2_package")
#     m.warmup()
#     return m
#
# model = load_model()
# st.title("BacSense v2 — Bacterial Classifier")
# uploaded = st.file_uploader("Upload microscopy image", type=["png","jpg","jpeg"])
# if uploaded:
#     with open("temp_input.png", "wb") as f:
#         f.write(uploaded.read())
#     result = model.predict("temp_input.png", verbose=True)
#     st.success(f"Prediction: {result['prediction']}")
#     st.metric("Confidence", f"{result['confidence']:.2%}")
#     col1, col2, col3 = st.columns(3)
#     col1.metric("Gram Stain", result["gram"])
#     col2.metric("Shape",      result["shape"])
#     col3.metric("Risk Level", result["risk"])
#     if result["routed_to_specialist"]:
#         st.info("Specialist classifier was used for E.coli / P.aeruginosa disambiguation")
