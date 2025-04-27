from uuid import UUID
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.models.client import Client
from app.schemas.client import ClientCreate, ClientUpdate

def get_client(db: Session, client_id: str) -> Optional[Client]:
    """
    Get a client by ID
    """
    return db.query(Client).filter(Client.id == client_id).first()

def get_client_by_doc(db: Session, doc_type: str, doc_number: str) -> Optional[Client]:
    """
    Get a client by document type and number
    """
    return db.query(Client).filter(
        Client.doc_type == doc_type,
        Client.doc_number == doc_number
    ).first()

def get_clients(db: Session, skip: int = 0, limit: int = 100) -> List[Client]:
    """
    Get a list of clients
    """
    return db.query(Client).offset(skip).limit(limit).all()

def create_client(db: Session, client: ClientCreate) -> Client:
    """
    Create a new client
    """
    db_client = Client(
        type=client.type,
        doc_type=client.doc_type,
        doc_number=client.doc_number,
        name=client.name,
        address=client.address,
        postal_code=client.postal_code,
        city=client.city,
        province=client.province,
        country=client.country,
        notes=client.notes
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def update_client(db: Session, client_id: str, client: ClientUpdate) -> Client:
    """
    Update a client
    """
    db_client = get_client(db, client_id)
    update_data = client.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_client, key, value)
    
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def delete_client(db: Session, client_id: str) -> None:
    """
    Delete a client
    """
    db_client = get_client(db, client_id)
    db.delete(db_client)
    db.commit()

def search_clients(db: Session, query: str, limit: int = 10) -> List[Client]:
    """
    Search clients by name, document number, or email
    """
    return db.query(Client).filter(
        (Client.name.ilike(f"%{query}%")) |
        (Client.doc_number.ilike(f"%{query}%"))
    ).limit(limit).all()
