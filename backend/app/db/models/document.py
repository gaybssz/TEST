import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Date, Numeric, Text, Integer
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(String, nullable=False)  # presupuesto, albaran, factura
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id"), nullable=False)
    number = Column(String, nullable=False, unique=True, index=True)
    date = Column(Date, nullable=False, index=True)
    due_date = Column(Date)
    status = Column(String, nullable=False, index=True)
    subtotal = Column(Numeric(15, 2), nullable=False)
    tax_total = Column(Numeric(15, 2), nullable=False)
    total = Column(Numeric(15, 2), nullable=False)
    notes = Column(Text)
    terms = Column(Text)
    created_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    parent_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"))
    template_id = Column(UUID(as_uuid=True), ForeignKey("templates.id"))
    public_code = Column(String, unique=True)
    hash = Column(String)
    verifactu_status = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    client = relationship("Client", back_populates="documents")
    created_by = relationship("User", back_populates="documents")
    parent = relationship("Document", remote_side=[id], backref="children")
    template = relationship("Template")
    line_items = relationship("LineItem", back_populates="document", cascade="all, delete-orphan")
    verifactu_records = relationship("VerifactuRecord", back_populates="document", cascade="all, delete-orphan")
