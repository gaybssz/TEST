from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.auth import get_current_active_user
from app.db.session import get_db
from app.schemas import Contact, ContactCreate, ContactUpdate, User
from app.services import contact_service

router = APIRouter()

@router.post("/", response_model=Contact, status_code=status.HTTP_201_CREATED)
def create_contact(
    client_id: str,
    contact: ContactCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return contact_service.create_contact(db=db, client_id=client_id, contact=contact)

@router.get("/", response_model=List[Contact])
def read_contacts(
    client_id: str,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    contacts = contact_service.get_contacts_by_client(db, client_id=client_id, skip=skip, limit=limit)
    return contacts

@router.get("/{contact_id}", response_model=Contact)
def read_contact(
    contact_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_contact = contact_service.get_contact(db, contact_id=contact_id)
    if db_contact is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    return db_contact

@router.put("/{contact_id}", response_model=Contact)
def update_contact(
    contact_id: str, 
    contact: ContactUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_contact = contact_service.get_contact(db, contact_id=contact_id)
    if db_contact is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    return contact_service.update_contact(db=db, contact_id=contact_id, contact=contact)

@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(
    contact_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_contact = contact_service.get_contact(db, contact_id=contact_id)
    if db_contact is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact not found"
        )
    contact_service.delete_contact(db=db, contact_id=contact_id)
    return None
