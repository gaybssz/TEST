from datetime import datetime, date
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, Field
from .line_item import LineItem

# Document schemas
class DocumentBase(BaseModel):
    type: str  # presupuesto, albaran, factura
    client_id: UUID
    number: str
    date: date
    due_date: Optional[date] = None
    status: str
    notes: Optional[str] = None
    terms: Optional[str] = None

class DocumentCreate(DocumentBase):
    line_items: List[LineItem] = []

class DocumentUpdate(BaseModel):
    type: Optional[str] = None
    client_id: Optional[UUID] = None
    number: Optional[str] = None
    date: Optional[date] = None
    due_date: Optional[date] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    terms: Optional[str] = None

class DocumentInDB(DocumentBase):
    id: UUID
    subtotal: float
    tax_total: float
    total: float
    created_by_id: UUID
    parent_id: Optional[UUID] = None
    template_id: Optional[UUID] = None
    public_code: Optional[str] = None
    hash: Optional[str] = None
    verifactu_status: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Document(DocumentInDB):
    line_items: List[LineItem] = []
