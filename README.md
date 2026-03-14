# 🦠 Bacsense 2.0

![Bacsense Banner](https://img.shields.io/badge/Bacsense-2.0-13a4ec?style=for-the-badge)

**Bacsense 2.0** is an open-access visual platform for clinical microbiology research. Our mission is to accelerate pathogen identification through advanced hybrid neural networks and machine learning. 

This project integrates a robust **VGG16 + SVM** hybrid classification architecture with a modern, high-performance web interface to quickly and accurately identify microscopic bacterial species from uploaded culture images.

## ✨ Key Features

- **🔬 High-Accuracy Classification:** Leverages a pre-trained VGG16 backbone for deep feature extraction, paired with a Support Vector Machine (SVM) classifier for pinpoint taxa identification.
- **⚡ Real-time API:** Fast and lightweight inference backend powered by FastAPI.
- **🌌 Premium Scientific UI:** A stunning, fully responsive dark-theme design featuring highly interactive GSAP spring cursors, meteor shower effects, and beautifully animated petri-dish data components.
- **📊 Detailed Analysis Metrics:** Get immediate clinical insights on morphological traits, probability distribution thresholds, and gram stains for tested pathogens natively in the browser.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React + Vite (TypeScript)
- **Styling:** Tailwind CSS
- **Animations:** GSAP (GreenSock) & Framer Motion
- **UI Architecture:** MagicUI

### Backend / ML Engine
- **REST API Runtime:** FastAPI & Uvicorn
- **Machine Learning Pipelines:** TensorFlow / Keras (VGG16), Scikit-Learn (SVM, PCA)
- **Image Processing Computation:** Pillow (PIL), NumPy, SciPy

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Python](https://python.org/) (3.9+)

### 1. Boot the ML Backend

Open a terminal in the project root and navigate to the backend service to spin up the prediction API:

```bash
cd bacterial-classifier
python -m venv venv

# Windows Activation
venv\Scripts\activate  
# Mac/Linux Activation
# source venv/bin/activate  

pip install -r requirements.txt
pip install fastapi uvicorn python-multipart

# Start the FastAPI uvicorn server
uvicorn api:app --host 0.0.0.0 --port 5000 --reload
```
The ML API will successfully bind to `http://localhost:5000`.

### 2. Start the React Frontend

Open a new terminal tab, navigate to the frontend folder, install dependencies, and launch the Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

The user interface will be live at `http://localhost:5173`. 🥳 Drag and drop a microscopic image into the Upload Zone to test the prediction model!

## 🔬 Supported Species
The engine spans multiple common pathogenic datasets and correctly identifies critical bacteria including:
- *Escherichia coli* (Gram-negative)
- *Staphylococcus aureus* (Gram-positive)
- *Clostridium perfringens* (Anaerobic)
- *Bacillus cereus* (Spore-forming)
- *Listeria monocytogenes*

---
*© 2026 Bacsense Scientific Systems. Built for Next-Gen Bioinformatics.*