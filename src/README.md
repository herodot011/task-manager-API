# Task Manager API(Node.js + Express)

## 📌 Description

Task Manager API is a RESTful backend application built with Node.js and Express, following a layered architecture approach (Controller → Service → Repository).

The project demonstrates core backend development principles including clean architecture, middleware usage, centralized error handling, pagination, filtering, and structured code organization.

Data is stored in memory (no database integration yet), allowing the focus to remain on backend architecture and business logic implementation.

## ⚙️ The application follows a layered architecture to ensure separation of concerns

Client
  ↓
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories

## ⚙️ Tech Stack

- Node.js
- Express.js
- dotenv
- UUID
- Middleware pattern
- Layered architecture (Controller → Service → Repository)


## 📁 Project Structure
src/
│
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── validators/
├── utils/
└── app.js

## 🛠 Model Task
{
  "id": "uuid",
  "title": "string",
  "status": "pending | in-progress | done",
  "createdAt": "ISO string",
  "updatedAt": "ISO string (optional)"
}

## 🚀 Installation & Run

1. Clone the repository:

git clone <repo-url>

2. npm install

3. npm start

## 🛠 API Endpoints

| Method | Route          | Description                 |
|--------|----------------|------------------------------|
| GET    | /tasks         | Get all tasks                |
| GET    | /tasks/:id     | Get a single task by ID      |
| PATCH  | /tasks/:id     | Update task                  |
| DELETE | /tasks/:id     | Delete a task                |


## ✨ Features

- Full CRUD operations for tasks
- UUID-based task identifiers
- Pagination support (`page`, `limit`)
- Filtering by status (`?status=done`)
- Partial updates via PATCH
- Automatic `createdAt` and `updatedAt` timestamps
- Centralized error handling
- Request logging middleware
- 404 handler middleware    

## 🔮 Future Improvements

- JWT authentication & authorization
- Database integration (MongoDB / PostgreSQL)
- Unit & integration testing (Jest + Supertest)
- Swagger/OpenAPI documentation
- Docker containerization
- Deployment (Render / Railway / VPS)
