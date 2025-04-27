from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import json
import datetime

from app.core.auth import get_current_active_user
from app.db.session import get_db
from app.schemas import User, Document
from app.services import document_service

router = APIRouter()

@router.post("/{document_id}/register", response_model=Dict[str, Any])
def register_document(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Register a document with VERI*FACTU
    """
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
    
    # Check if document is already registered
    if db_document.verifactu_status == "registered":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Document already registered with VERI*FACTU"
        )
    
    # Register document with VERI*FACTU
    updated_document = document_service.submit_to_verifactu(db=db, document_id=document_id, user_id=str(current_user.id))
    
    return {
        "status": "success",
        "message": "Document registered with VERI*FACTU",
        "document_id": str(updated_document.id),
        "verifactu_status": updated_document.verifactu_status,
        "hash": updated_document.hash,
        "public_code": updated_document.public_code
    }

@router.post("/{document_id}/cancel", response_model=Dict[str, Any])
def cancel_document(
    document_id: str,
    reason: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Cancel a document in VERI*FACTU
    """
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
    
    # Check if document is registered
    if db_document.verifactu_status != "registered":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Document is not registered with VERI*FACTU"
        )
    
    # Cancel document in VERI*FACTU
    from app.db.models.verifactu_record import VerifactuRecord
    
    # Simulate cancellation
    db_document.verifactu_status = "cancelled"
    
    # Create a verifactu record for the cancellation
    verifactu_record = VerifactuRecord(
        document_id=document_id,
        record_type="anulacion",
        status="success",
        request_data={"document_id": str(document_id), "reason": reason},
        response_data={"result": "success", "code": db_document.public_code},
        hash=db_document.hash,
        qr_code=f"https://verifactu.es/verify/{db_document.public_code}",
        created_by_id=str(current_user.id)
    )
    
    db.add(verifactu_record)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    return {
        "status": "success",
        "message": "Document cancelled in VERI*FACTU",
        "document_id": str(db_document.id),
        "verifactu_status": db_document.verifactu_status
    }

@router.post("/{document_id}/rectify", response_model=Dict[str, Any])
def rectify_document(
    document_id: str,
    rectified_document_id: str,
    reason: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Rectify a document in VERI*FACTU
    """
    db_document = document_service.get_document(db, document_id=document_id)
    if db_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found"
        )
    
    db_rectified_document = document_service.get_document(db, document_id=rectified_document_id)
    if db_rectified_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rectified document not found"
        )
    
    # Check if user is the document creator or an admin
    if str(db_document.created_by_id) != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    # Check if document is registered
    if db_document.verifactu_status != "registered":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Document is not registered with VERI*FACTU"
        )
    
    # Rectify document in VERI*FACTU
    from app.db.models.verifactu_record import VerifactuRecord
    
    # Simulate rectification
    db_document.verifactu_status = "rectified"
    db_rectified_document.verifactu_status = "registered"
    db_rectified_document.rectifies_document_id = document_id
    db_rectified_document.hash = "rectified_hash_" + datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    db_rectified_document.public_code = f"RECT-{db_rectified_document.number}"
    
    # Create a verifactu record for the rectification
    verifactu_record = VerifactuRecord(
        document_id=rectified_document_id,
        record_type="subsanacion",
        status="success",
        request_data={
            "document_id": str(rectified_document_id), 
            "rectifies_document_id": str(document_id),
            "reason": reason
        },
        response_data={
            "result": "success", 
            "code": db_rectified_document.public_code,
            "hash": db_rectified_document.hash
        },
        hash=db_rectified_document.hash,
        qr_code=f"https://verifactu.es/verify/{db_rectified_document.public_code}",
        created_by_id=str(current_user.id)
    )
    
    db.add(verifactu_record)
    db.add(db_document)
    db.add(db_rectified_document)
    db.commit()
    db.refresh(db_rectified_document)
    
    return {
        "status": "success",
        "message": "Document rectified in VERI*FACTU",
        "original_document_id": str(db_document.id),
        "rectified_document_id": str(db_rectified_document.id),
        "verifactu_status": db_rectified_document.verifactu_status,
        "hash": db_rectified_document.hash,
        "public_code": db_rectified_document.public_code
    }

@router.get("/records/{document_id}", response_model=List[Dict[str, Any]])
def get_verifactu_records(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get VERI*FACTU records for a document
    """
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
    
    # Get VERI*FACTU records
    from app.db.models.verifactu_record import VerifactuRecord
    records = db.query(VerifactuRecord).filter(VerifactuRecord.document_id == document_id).all()
    
    result = []
    for record in records:
        result.append({
            "id": str(record.id),
            "document_id": str(record.document_id),
            "record_type": record.record_type,
            "status": record.status,
            "request_data": record.request_data,
            "response_data": record.response_data,
            "hash": record.hash,
            "qr_code": record.qr_code,
            "created_at": record.created_at.isoformat() if record.created_at else None
        })
    
    return result

@router.get("/status/{document_id}", response_model=Dict[str, Any])
def get_verifactu_status(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get VERI*FACTU status for a document
    """
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
    
    return {
        "document_id": str(db_document.id),
        "document_number": db_document.number,
        "verifactu_status": db_document.verifactu_status,
        "hash": db_document.hash,
        "public_code": db_document.public_code,
        "registered_at": db_document.updated_at.isoformat() if db_document.updated_at else None
    }

@router.get("/verify/{public_code}")
def verify_document_public(
    public_code: str,
    nif: str,
    db: Session = Depends(get_db)
):
    """
    Public endpoint to verify a document using its public code and the client's NIF
    """
    # This endpoint is public and doesn't require authentication
    db_document = document_service.verify_document(db, public_code=public_code, nif=nif)
    if db_document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found or verification failed"
        )
    
    # Get the latest VERI*FACTU record
    from app.db.models.verifactu_record import VerifactuRecord
    record = db.query(VerifactuRecord).filter(
        VerifactuRecord.document_id == db_document.id
    ).order_by(VerifactuRecord.created_at.desc()).first()
    
    return {
        "verification_status": "valid",
        "document_number": db_document.number,
        "document_type": db_document.type,
        "document_date": db_document.date.isoformat() if db_document.date else None,
        "document_total": float(db_document.total) if db_document.total else 0.0,
        "verifactu_status": db_document.verifactu_status,
        "hash": db_document.hash,
        "public_code": db_document.public_code,
        "registered_at": record.created_at.isoformat() if record and record.created_at else None
    }
