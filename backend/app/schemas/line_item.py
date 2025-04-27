from datetime import datetime, date
from typing import Optional, List, Decimal
from uuid import UUID
from pydantic import BaseModel, Field

# Line Item schemas
class LineItemBase(BaseModel):
    description: str
    quantity: Decimal
    price: Decimal
    tax_rate: Decimal
    position: int

class LineItemCreate(LineItemBase):
    pass

class LineItemUpdate(BaseModel):
    description: Optional[str] = None
    quantity: Optional[Decimal] = None
    price: Optional[Decimal] = None
    tax_rate: Optional[Decimal] = None
    position: Optional[int] = None

class LineItemInDB(LineItemBase):
    id: UUID
    document_id: UUID
    tax_amount: Decimal
    subtotal: Decimal
    total: Decimal
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class LineItem(LineItemInDB):
    pass
