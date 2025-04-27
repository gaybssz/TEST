from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field

# Client schemas
class ClientBase(BaseModel):
    type: str  # individual or business
    doc_type: str  # NIF, NIE, CIF, Passport
    doc_number: str
    name: str
    address: str
    postal_code: str
    city: str
    province: str
    country: str = "España"
    notes: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class ClientUpdate(BaseModel):
    type: Optional[str] = None
    doc_type: Optional[str] = None
    doc_number: Optional[str] = None
    name: Optional[str] = None
    address: Optional[str] = None
    postal_code: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    country: Optional[str] = None
    notes: Optional[str] = None

class ClientInDB(ClientBase):
    id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Client(ClientInDB):
    contacts: List["Contact"] = []
