from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.auth import get_current_active_user
from app.db.session import get_db
from app.schemas import Document, DocumentCreate, DocumentUpdate, User
from app.services import document_service

router = APIRouter()

@router.post("/", response_model=Document, status_code=status.HTTP_201_CREATED)
def create_document(
    document: DocumentCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Set the current user as the document creator
    return document_service.create_document(db=db, document=document, user_id=str(current_user.id))

@router.get("/", response_model=List[Document])
def read_documents(
    skip: int = 0, 
    limit: int = 100, 
    type: str = None,
    client_id: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    documents = document_service.get_documents(
        db, 
        skip=skip, 
        limit=limit, 
        type=type,
        client_id=client_id
    )
    return documents

@router.get("/{document_id}", response_model=Document)
def read_document(
    document_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_document = document_service.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    return db_document

@router.put("/{document_id}", response_model=Document)
def update_document(
    document_id: str, 
    document: DocumentUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_document = document_service.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Check if user is the document creator or an admin
    if str(db_document.created_by_id) != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
        
    return document_service.update_document(db=db, document_id=document_id, document=document)

@router.delete("/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(
    document_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_document = document_service.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Check if user is the document creator or an admin
    if str(db_document.created_by_id) != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
        
    document_service.delete_document(db=db, document_id=document_id)
    return None

@router.post("/{document_id}/verifactu", response_model=Document)
def submit_to_verifactu(
    document_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_document = document_service.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    # Check if user is the document creator or an admin
    if str(db_document.created_by_id) != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
        
    return document_service.submit_to_verifactu(db=db, document_id=document_id, user_id=str(current_user.id))

@router.get("/public/{public_code}")
def verify_document(public_code: str, nif: str, db: Session = Depends(get_db)):
    # This endpoint is public and doesn't require authentication
    db_document = document_service.verify_document(db, public_code=public_code, nif=nif)
    if db_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found or verification failed"
        )
    return db_document
