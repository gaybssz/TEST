import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.session import Base

class Settings(Base):
    __tablename__ = "settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    company_name = Column(String, nullable=False)
    company_type = Column(String, nullable=False)  # autonomo, empresa
    company_doc_type = Column(String, nullable=False)  # NIF, CIF
    company_doc = Column(String, nullable=False)
    company_address = Column(String, nullable=False)
    company_postal = Column(String, nullable=False)
    company_city = Column(String, nullable=False)
    company_province = Column(String, nullable=False)
    company_country = Column(String, nullable=False, default="España")
    company_email = Column(String)
    company_phone = Column(String)
    company_website = Column(String)
    logo = Column(String)
    default_tax = Column(String, nullable=False, default="21.00")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="settings")
