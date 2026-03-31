FROM python:3.10-slim

# Install system dependencies for OpenCV and scikit-image
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set up a new user named "user" with user ID 1000
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set the working directory to the user's home directory
WORKDIR /home/user/app

# Copy the requirements file into the container
COPY --chown=user requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY --chown=user . .

# Hugging Face Spaces expects the app to run on port 7860
EXPOSE 7860

# Command to run the FastAPI application
CMD ["uvicorn", "bacterial-classifier.api:app", "--host", "0.0.0.0", "--port", "7860"]
