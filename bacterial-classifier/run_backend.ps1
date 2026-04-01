.\venv\Scripts\Activate.ps1
pip install -r ..\bacsense_v2_package\requirements.txt
pip install fastapi uvicorn python-multipart
python -m uvicorn api:app --reload --port 5000
