
BACTERIAL CLASSIFICATION MODEL
================================

Author: ALAPAN SEN
Enrollment: A9100522041
Institution: Amity University Kolkata

PERFORMANCE
-----------
Test Accuracy: 95.83%
Validation Accuracy: 94.80%

MODEL ARCHITECTURE
------------------
Type: Hybrid VGG16 + SVM
PCA Components: 94
SVM Parameters: C=10, gamma=0.01

BACTERIAL SPECIES (5 classes)
------------------------------
1. Clostridium perfringens
2. Enterococcus faecalis
3. Escherichia coli
4. Listeria monocytogenes
5. Pseudomonas aeruginosa

USAGE
-----
1. Install dependencies:
   pip install -r requirements.txt

2. Test the model:
   python test_model.py

3. Classify an image:
   python inference_script.py bacteria.jpg

4. Or use in Python:
   from inference_script import BacterialClassifier
   
   classifier = BacterialClassifier(models_dir='models')
   result = classifier.classify('bacteria.jpg')
   print(result)

PACKAGE CONTENTS
----------------
models/
  - vgg16_feature_extractor.keras
  - pca_model.pkl
  - standard_scaler.pkl
  - svm_classifier.pkl
  - class_names.pkl
  - bacteria_info.pkl

inference_script.py - Classifier code
test_model.py - Model verification
requirements.txt - Dependencies
README.txt - This file
model_metadata.json - Model specifications

Created: 2025-12-03 18:59:38
