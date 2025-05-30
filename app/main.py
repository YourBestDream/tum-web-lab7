from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import car_parts
from .models.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Car Parts API",
    description="A RESTful API for managing car parts inventory",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(car_parts.router, prefix="/api/v1", tags=["car-parts"]) 