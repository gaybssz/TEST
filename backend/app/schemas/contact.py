from datetime import datetime
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field

# Contact schemas
class ContactBase(BaseModel):
    type: str  # email, phone, whatsapp
    value: str
    primary: bool = False

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    type: Optional[str] = None
    value: Optional[str] = None
    primary: Optional[bool] = None

class ContactInDB(ContactBase):
    id: UUID
    client_id: UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Contact(ContactInDB):
    pass
