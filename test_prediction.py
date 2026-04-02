import requests
import os

url = "http://localhost:5000/predict_batch"
image_path = os.path.abspath("frontend/public/architecture.png")

with open(image_path, "rb") as f:
    files = {"files": ("architecture.png", f, "image/png")}
    try:
        r = requests.post(url, files=files)
        print(f"Status Code: {r.status_code}")
        print("Response JSON:")
        print(r.json())
    except Exception as e:
        print(f"Error: {e}")
