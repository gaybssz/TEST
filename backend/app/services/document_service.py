from uuid import UUID
from sqlalchemy.orm import Session
from typing import List, Optional
import datetime

from app.db.models.document import Document
from app.db.models.line_item import LineItem
from app.schemas.document import DocumentCreate, DocumentUpdate

def get_document(db: Session, document_id: str) -> Optional[Document]:
    """
    Get a document by ID
    """
    return db.query(Document).filter(Document.id == document_id).first()

def get_document_by_number(db: Session, number: str) -> Optional[Document]:
    """
    Get a document by number
    """
    return db.query(Document).filter(Document.number == number).first()

def get_documents(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    type: Optional[str] = None,
    client_id: Optional[str] = None
) -> List[Document]:
    """
    Get a list of documents with optional filters
    """
    query = db.query(Document)
    
    if type:
        query = query.filter(Document.type == type)
    
    if client_id:
        query = query.filter(Document.client_id == client_id)
    
    return query.order_by(Document.date.desc()).offset(skip).limit(limit).all()

def create_document(db: Session, document: DocumentCreate, user_id: str) -> Document:
    """
    Create a new document
    """
    # Calculate totals
    subtotal = 0
    tax_total = 0
    
    # Create document
    db_document = Document(
        type=document.type,
        client_id=document.client_id,
        number=document.number,
        date=document.date,
        due_date=document.due_date,
        status=document.status,
        subtotal=subtotal,
        tax_total=tax_total,
        total=subtotal + tax_total,
        notes=document.notes,
        terms=document.terms,
        created_by_id=user_id
    )
    
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    # Add line items
    for i, item in enumerate(document.line_items):
        item_subtotal = float(item.quantity) * float(item.price)
        item_tax = item_subtotal * (float(item.tax_rate) / 100)
        
        db_line_item = LineItem(
            document_id=db_document.id,
            description=item.description,
            quantity=item.quantity,
            price=item.price,
            tax_rate=item.tax_rate,
            tax_amount=item_tax,
            subtotal=item_subtotal,
            total=item_subtotal + item_tax,
            position=i
        )
        
        db.add(db_line_item)
        subtotal += item_subtotal
        tax_total += item_tax
    
    # Update document totals
    db_document.subtotal = subtotal
    db_document.tax_total = tax_total
    db_document.total = subtotal + tax_total
    
    db.commit()
    db.refresh(db_document)
    
    return db_document

def update_document(db: Session, document_id: str, document: DocumentUpdate) -> Document:
    """
    Update a document
    """
    db_document = get_document(db, document_id)
    update_data = document.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_document, key, value)
    
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

def delete_document(db: Session, document_id: str) -> None:
    """
    Delete a document
    """
    db_document = get_document(db, document_id)
    db.delete(db_document)
    db.commit()

def submit_to_verifactu(db: Session, document_id: str, user_id: str) -> Document:
    """
    Submit a document to VERI*FACTU
    """
    db_document = get_document(db, document_id=document_id)
    
    # In a real implementation, this would call the VERI*FACTU API
    # For now, we'll just simulate the integration as requested
    db_document.verifactu_status = "registered"
    db_document.hash = "sample_hash_" + datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    db_document.public_code = f"FACT-{db_document.number}"
    
    # Create a verifactu record
    from app.db.models.verifactu_record import VerifactuRecord
    verifactu_record = VerifactuRecord(
        document_id=document_id,
        record_type="alta",
        status="success",
        request_data={"document_id": str(document_id), "type": db_document.type},
        response_data={"result": "success", "code": db_document.public_code, "hash": db_document.hash},
        hash=db_document.hash,
        qr_code=f"https://verifactu.es/verify/{db_document.public_code}",
        created_by_id=user_id
    )
    
    db.add(verifactu_record)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    return db_document

def generate_pdf(db: Session, document_id: str) -> str:
    """
    Generate a PDF for a document
    """
    db_document = get_document(db, document_id=document_id)
    
    # In a real implementation, this would generate a PDF using a library like WeasyPrint or ReportLab
    # For now, we'll just simulate the PDF generation
    pdf_filename = f"document_{db_document.number}_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
    pdf_url = f"/documents/pdf/{pdf_filename}"
    
    # Update the document with the PDF URL
    db_document.pdf_url = pdf_url
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    
    return pdf_url

def send_document_email(db: Session, document_id: str, email: str, message: str = None) -> dict:
    """
    Send a document via email
    """
    db_document = get_document(db, document_id=document_id)
    
    # In a real implementation, this would send an email with the document attached
    # For now, we'll just simulate the email sending
    result = {
        "sent_to": email,
        "document_id": str(document_id),
        "document_number": db_document.number,
        "sent_at": datetime.datetime.now().isoformat(),
        "status": "sent"
    }
    
    return result

def verify_document(db: Session, public_code: str, nif: str) -> Optional[Document]:
    """
    Verify a document using its public code and the client's NIF
    """
    document = db.query(Document).filter(Document.public_code == public_code).first()
    
    if not document:
        return None
    
    # In a real implementation, we would check if the NIF matches the client's NIF
    # For now, we'll just return the document
    
    return document
