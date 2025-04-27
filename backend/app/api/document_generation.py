from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from app.core.auth import get_current_active_user
from app.db.session import get_db
from app.schemas import Document, DocumentCreate, DocumentUpdate, User, Template, TemplateCreate, TemplateUpdate
from app.services import document_service, template_service

router = APIRouter()

@router.post("/templates/", response_model=Template, status_code=status.HTTP_201_CREATED)
def create_template(
    template: TemplateCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return template_service.create_template(db=db, template=template, user_id=str(current_user.id))

@router.get("/templates/", response_model=List[Template])
def read_templates(
    skip: int = 0, 
    limit: int = 100, 
    type: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    templates = template_service.get_templates(
        db, 
        skip=skip, 
        limit=limit, 
        type=type
    )
    return templates

@router.get("/templates/{template_id}", response_model=Template)
def read_template(
    template_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_template = template_service.get_template(db, template_id=template_id)
    if db_template is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Template not found"
        )
    return db_template

@router.put("/templates/{template_id}", response_model=Template)
def update_template(
    template_id: str, 
    template: TemplateUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_template = template_service.get_template(db, template_id=template_id)
    if db_template is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Template not found"
        )
    
    # Check if user is the template creator or an admin
    if str(db_template.created_by_id) != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
        
    return template_service.update_template(db=db, template_id=template_id, template=template)

@router.delete("/templates/{template_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_template(
    template_id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_template = template_service.get_template(db, template_id=template_id)
    if db_template is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Template not found"
        )
    
    # Check if user is the template creator or an admin
    if str(db_template.created_by_id) != str(current_user.id) and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
        
    template_service.delete_template(db=db, template_id=template_id)
    return None

@router.post("/generate-pdf/{document_id}")
async def generate_pdf(
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
    
    # Generate PDF (simulated for now)
    pdf_url = document_service.generate_pdf(db=db, document_id=document_id)
    
    return {"pdf_url": pdf_url, "message": "PDF generated successfully"}

@router.post("/preview-template")
async def preview_template(
    template_data: dict,
    current_user: User = Depends(get_current_active_user)
):
    # This endpoint allows previewing a template without saving it
    # Simulated for now
    return {
        "preview_url": f"https://example.com/preview/{hash(json.dumps(template_data))}",
        "message": "Template preview generated"
    }

@router.post("/documents/{document_id}/send-email")
async def send_document_email(
    document_id: str,
    email: str,
    message: Optional[str] = None,
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
    
    # Send email (simulated for now)
    result = document_service.send_document_email(
        db=db, 
        document_id=document_id, 
        email=email, 
        message=message
    )
    
    return {"message": "Email sent successfully", "result": result}
