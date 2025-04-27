from fastapi import APIRouter

from app.api import users, clients, documents, auth, contacts, document_generation, verifactu

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(clients.router, prefix="/clients", tags=["clients"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(contacts.router, prefix="/clients/{client_id}/contacts", tags=["contacts"])
api_router.include_router(document_generation.router, prefix="/document-generation", tags=["document-generation"])
api_router.include_router(verifactu.router, prefix="/verifactu", tags=["verifactu"])
