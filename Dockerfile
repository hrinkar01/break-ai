FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source files
COPY src/ ./src/

EXPOSE 8000

# Run FastAPI from src directory
CMD ["python", "src/server.py"]