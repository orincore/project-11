# Backend Generation Prompt for Orincore Portfolio Project

## Overview
Create a robust backend for a developer portfolio and business website built with React (Vite, TypeScript, TailwindCSS, Framer Motion). The backend should use **Node.js**, **Express**, and **TypeScript**. Integrate with **Supabase** (PostgreSQL + Auth) for data and authentication, **Cloudinary** for media uploads, and be ready for deployment on **Render.com**.

## Requirements

### 1. Tech Stack
- Node.js
- Express
- TypeScript
- Supabase (PostgreSQL for data, Supabase Auth for authentication)
- Cloudinary (for image/media uploads)
- dotenv for environment variables
- CORS enabled for frontend-backend communication

### 2. Folder Structure
```
backend/
  src/
    controllers/
    routes/
    middleware/
    utils/
    app.ts
  package.json
  tsconfig.json
  .env.example
```

### 3. Environment Variables (.env)
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_ANON_KEY (if needed for frontend)
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- FRONTEND_URL (for CORS)

### 4. Features & Endpoints
#### Portfolio
- CRUD endpoints for projects (store metadata in Supabase, images in Cloudinary)
- Example: `GET /api/portfolio`, `POST /api/portfolio`, `PUT /api/portfolio/:id`, `DELETE /api/portfolio/:id`

#### Reviews
- CRUD endpoints for testimonials (Supabase)
- Example: `GET /api/reviews`, `POST /api/reviews`, etc.

#### Contact
- Endpoint to receive contact messages (store in Supabase or send email via a service like Nodemailer)
- Example: `POST /api/contact`

#### Auth
- Use Supabase Auth for admin login/session
- Middleware to protect admin routes

#### Media Upload
- Endpoint to upload images/files to Cloudinary, return URL, and store in Supabase
- Example: `POST /api/upload`

### 5. Integrations
- **Supabase**: Use `@supabase/supabase-js` for database and auth operations
- **Cloudinary**: Use `cloudinary` npm package for uploads

### 6. Middleware
- CORS (allow requests from frontend URL)
- Error handling
- Auth protection for sensitive routes

### 7. Best Practices
- Use TypeScript throughout
- Organize code with controllers, routes, middleware, and utils
- Use async/await and proper error handling
- Validate incoming data (e.g., with Zod or express-validator)
- Use environment variables for all secrets/URLs
- Prepare for deployment on Render.com (e.g., use PORT from env)

### 8. Example API Usage
- Example fetch/axios calls from frontend to backend endpoints
- Example of uploading an image from frontend to backend, then to Cloudinary

### 9. Dev Experience
- Scripts for dev (`ts-node-dev`), build, and start
- Instructions for running locally and deploying to Render.com

---

## Output
- All backend code, ready to run and deploy
- Example .env file
- Example API usage from frontend
- Clear documentation/comments

---

**This backend should be production-ready, secure, and easy to extend.** 