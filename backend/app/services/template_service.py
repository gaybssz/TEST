from uuid import UUID
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
import datetime
import json

from app.db.models.template import Template
from app.schemas.template import TemplateCreate, TemplateUpdate

def get_template(db: Session, template_id: str) -> Optional[Template]:
    """
    Get a template by ID
    """
    return db.query(Template).filter(Template.id == template_id).first()

def get_templates(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    type: Optional[str] = None
) -> List[Template]:
    """
    Get a list of templates with optional filters
    """
    query = db.query(Template)
    
    if type:
        query = query.filter(Template.type == type)
    
    return query.offset(skip).limit(limit).all()

def create_template(db: Session, template: TemplateCreate, user_id: str) -> Template:
    """
    Create a new template
    """
    # If this is set as default, unset any existing default templates of the same type
    if template.is_default:
        existing_defaults = db.query(Template).filter(
            Template.type == template.type,
            Template.is_default == True
        ).all()
        
        for existing in existing_defaults:
            existing.is_default = False
            db.add(existing)
    
    db_template = Template(
        name=template.name,
        type=template.type,
        content=template.content,
        is_default=template.is_default,
        created_by_id=user_id
    )
    
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    
    return db_template

def update_template(db: Session, template_id: str, template: TemplateUpdate) -> Template:
    """
    Update a template
    """
    db_template = get_template(db, template_id)
    update_data = template.dict(exclude_unset=True)
    
    # If updating to default, unset any existing default templates of the same type
    if update_data.get("is_default", False):
        existing_defaults = db.query(Template).filter(
            Template.type == db_template.type,
            Template.is_default == True,
            Template.id != template_id
        ).all()
        
        for existing in existing_defaults:
            existing.is_default = False
            db.add(existing)
    
    for key, value in update_data.items():
        setattr(db_template, key, value)
    
    db.add(db_template)
    db.commit()
    db.refresh(db_template)
    return db_template

def delete_template(db: Session, template_id: str) -> None:
    """
    Delete a template
    """
    db_template = get_template(db, template_id)
    db.delete(db_template)
    db.commit()

def get_default_template(db: Session, type: str) -> Optional[Template]:
    """
    Get the default template for a specific document type
    """
    return db.query(Template).filter(
        Template.type == type,
        Template.is_default == True
    ).first()
