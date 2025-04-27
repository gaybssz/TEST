import os
from pydantic_settings import BaseSettings
from typing import Optional, Dict, Any, List

class Settings(BaseSettings):
    # API settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "InvoiceX"
    
    # CORS settings
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # Security settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost/invoicex?sslmode=disable")
    
    # VERI*FACTU settings
    VERIFACTU_API_URL: str = os.getenv("VERIFACTU_API_URL", "https://api.verifactu.es/v1")
    VERIFACTU_API_KEY: Optional[str] = os.getenv("VERIFACTU_API_KEY")
    VERIFACTU_SIMULATION_MODE: bool = True
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
