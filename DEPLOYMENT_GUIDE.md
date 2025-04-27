# InvoiceX Deployment Guide

This guide provides instructions for deploying the InvoiceX application to production environments using Vercel for the frontend and Render for the backend.

## Prerequisites

- GitHub account
- Vercel account (for frontend deployment)
- Render account (for backend deployment)
- Basic knowledge of Git

## Backend Deployment (Render)

1. **Create a GitHub repository**
   - Create a new repository on GitHub
   - Push the backend code to this repository

2. **Set up on Render**
   - Log in to your Render account
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Select the repository containing the backend code
   - Configure the service:
     - Name: `invoicex-backend` (or your preferred name)
     - Environment: `Python`
     - Build Command: `pip install -r requirements.txt && alembic upgrade head`
     - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Under "Advanced", add the following environment variables:
     - `DATABASE_URL`: Render will provide this if you create a PostgreSQL database
     - `SECRET_KEY`: Generate a secure random string
     - `ALGORITHM`: `HS256`
     - `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`
   - Click "Create Web Service"

3. **Set up PostgreSQL on Render (Optional)**
   - Click "New +" and select "PostgreSQL"
   - Configure the database:
     - Name: `invoicex-db` (or your preferred name)
     - User: Leave as default
     - Database: `invoicex`
   - Click "Create Database"
   - Once created, go to your web service and add the `DATABASE_URL` from the PostgreSQL service

## Frontend Deployment (Vercel)

1. **Create a GitHub repository**
   - Create a new repository on GitHub
   - Push the frontend code to this repository

2. **Set up on Vercel**
   - Log in to your Vercel account
   - Click "Add New..." and select "Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: `Next.js`
     - Root Directory: `./` (or specify if your code is in a subdirectory)
   - Under "Environment Variables", add:
     - `NEXT_PUBLIC_API_URL`: The URL of your backend service on Render (e.g., `https://invoicex-backend.onrender.com`)
   - Click "Deploy"

## Connecting Frontend to Backend

1. After deploying both services, ensure the frontend's environment variable `NEXT_PUBLIC_API_URL` points to your backend service URL.
2. If you need to update this after deployment:
   - Go to your project on Vercel
   - Navigate to "Settings" > "Environment Variables"
   - Update the `NEXT_PUBLIC_API_URL` value
   - Redeploy the frontend

## Testing the Deployment

1. Access your frontend application via the Vercel URL
2. Try logging in with the default credentials:
   - Email: `admin@invoicex.com`
   - Password: `admin123`
3. Test all major functionality to ensure everything works correctly

## Troubleshooting

- **Backend Issues**: Check the logs in Render dashboard
- **Frontend Issues**: Check the deployment logs in Vercel dashboard
- **Database Connection Issues**: Verify the `DATABASE_URL` environment variable is correctly set
- **CORS Issues**: Ensure the backend CORS settings include your Vercel domain

## Maintenance

- **Backend Updates**: Push changes to your GitHub repository, Render will automatically redeploy
- **Frontend Updates**: Push changes to your GitHub repository, Vercel will automatically redeploy
- **Database Migrations**: Run migrations manually through Render shell or set up in the build command

## Security Considerations

- Ensure all sensitive environment variables are properly set and not exposed in the code
- Set up proper authentication and authorization
- Consider setting up SSL/TLS for secure communication
- Regularly update dependencies to patch security vulnerabilities
