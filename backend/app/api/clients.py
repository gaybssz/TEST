from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.auth import get_current_active_user
from app.db.session import get_db
from app.schemas import Client, ClientCreate, ClientUpdate, User
from app.services import client_service

router = APIRouter()

@router.post("/", response_model=Client, status_code=status.HTTP_201_CREATED)
def create_client(
    client: ClientCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return client_service.create_client(db=db, client=client)

@router.get("/", response_model=List[Client])
def read_clients(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    clients = client_service.get_clients(db, skip=skip, limit=limit)
    return clients

@router.get("/search", response_model=List[Client])
def search_clients(
    query: str,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    clients = client_service.search_clients(db, query=query, limit=limit)
    return clients

@router.get("/{client_id}", response_model=Client)
def read_client(
    client_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_client = client_service.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    return db_client

@router.put("/{client_id}", response_model=Client)
def update_client(
    client_id: str, 
    client: ClientUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_client = client_service.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    return client_service.update_client(db=db, client_id=client_id, client=client)

@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(
    client_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Only admins can delete clients
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
        
    db_client = client_service.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    client_service.delete_client(db=db, client_id=client_id)
    return None
