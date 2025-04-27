import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base

class Client(Base):
    __tablename__ = "clients"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(String, nullable=False)  # individual or business
    doc_type = Column(String, nullable=False)  # NIF, NIE, CIF, Passport
    doc_number = Column(String, nullable=False, index=True)
    name = Column(String, nullable=False, index=True)
    address = Column(String, nullable=False)
    postal_code = Column(String, nullable=False, index=True)
    city = Column(String, nullable=False)
    province = Column(String, nullable=False)
    country = Column(String, nullable=False, default="España")
    notes = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    contacts = relationship("Contact", back_populates="client", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="client")

    # Unique constraint for doc_type and doc_number
    __table_args__ = (
        UniqueConstraint('doc_type', 'doc_number', name='uix_client_doc'),
    )
