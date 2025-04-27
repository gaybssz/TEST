from uuid import UUID
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.models.contact import Contact
from app.schemas.contact import ContactCreate, ContactUpdate

def get_contact(db: Session, contact_id: str) -> Optional[Contact]:
    """
    Get a contact by ID
    """
    return db.query(Contact).filter(Contact.id == contact_id).first()

def get_contacts_by_client(db: Session, client_id: str, skip: int = 0, limit: int = 100) -> List[Contact]:
    """
    Get contacts for a specific client
    """
    return db.query(Contact).filter(Contact.client_id == client_id).offset(skip).limit(limit).all()

def create_contact(db: Session, client_id: str, contact: ContactCreate) -> Contact:
    """
    Create a new contact for a client
    """
    db_contact = Contact(
        client_id=client_id,
        type=contact.type,
        value=contact.value,
        primary=contact.primary
    )
    
    # If this is marked as primary, unmark any existing primary contacts of the same type
    if contact.primary:
        existing_primary = db.query(Contact).filter(
            Contact.client_id == client_id,
            Contact.type == contact.type,
            Contact.primary == True
        ).all()
        
        for existing in existing_primary:
            existing.primary = False
            db.add(existing)
    
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def update_contact(db: Session, contact_id: str, contact: ContactUpdate) -> Contact:
    """
    Update a contact
    """
    db_contact = get_contact(db, contact_id)
    update_data = contact.dict(exclude_unset=True)
    
    # If updating to primary, unmark any existing primary contacts of the same type
    if update_data.get("primary", False):
        existing_primary = db.query(Contact).filter(
            Contact.client_id == db_contact.client_id,
            Contact.type == db_contact.type,
            Contact.primary == True,
            Contact.id != contact_id
        ).all()
        
        for existing in existing_primary:
            existing.primary = False
            db.add(existing)
    
    for key, value in update_data.items():
        setattr(db_contact, key, value)
    
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def delete_contact(db: Session, contact_id: str) -> None:
    """
    Delete a contact
    """
    db_contact = get_contact(db, contact_id)
    db.delete(db_contact)
    db.commit()
