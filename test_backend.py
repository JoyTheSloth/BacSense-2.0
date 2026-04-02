import requests
try:
    r = requests.get("http://localhost:5000/debug_model")
    print(r.json())
except Exception as e:
    print(f"Error: {e}")
