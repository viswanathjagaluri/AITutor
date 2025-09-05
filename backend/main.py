# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models         # <- Fixed
from database import engine # <- Fixed

# ...

# Create all database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# IMPORTANT: Add CORS middleware to allow your React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # The default port for Vite React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from the FastAPI Backend!"}