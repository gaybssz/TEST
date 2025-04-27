import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base

class VerifactuRecord(Base):
    __tablename__ = "verifactu_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id"), nullable=False)
    record_type = Column(String, nullable=False)  # alta, anulacion, subsanacion
    status = Column(String, nullable=False)
    request_data = Column(JSONB, nullable=False)
    response_data = Column(JSONB)
    error_message = Column(Text)
    hash = Column(String)
    qr_code = Column(String)
    created_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    document = relationship("Document", back_populates="verifactu_records")
    created_by = relationship("User")
