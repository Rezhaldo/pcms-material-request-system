# PCSM Material Request System

A full-stack web application for managing material requests and their associated material details.

This project was developed as part of a technical assessment. It demonstrates a clean full-stack architecture including a React-based frontend, REST API backend, and relational database design.

---

# Repository Structure
pcsm-material-request-system
│
├── material-request-frontend
│ Frontend application (Next.js + TypeScript)
│
├── material-request-backend
│ Backend API (NestJS + Prisma)
│
├── database
│ material_request_schema.sql
│
├── README.md
└── .gitignore


---

# Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Custom React Hooks
- Fetch API

## Backend
- NestJS
- Prisma ORM
- TypeScript
- class-validator

## Database
- Relational database structure
- SQL schema provided

---

# Application Features

- Create material requests
- Add multiple materials to a request
- Edit request details and materials
- Delete requests
- View list of requests
- Backend validation for safe input
- Relational database structure between requests and materials

---

# Database Design

The system is built around **two main relational tables**

## Requests Table

Stores the main request information.

Example fields:

- id
- requestCode
- requestDate
- requester
- department
- createdAt
- updatedAt

---

## MaterialDetails Table

Stores detailed information about materials belonging to each request.

Example fields:

- id
- requestId
- materialDescription
- materialType
- quantity
- unit
- unitPrice
- totalPrice
- supplier
- notes
- createdAt
- updatedAt

Relationship: Requests (1) → (Many) MaterialDetails


Each request can contain multiple materials.

---

# SQL Database File

The SQL schema required to create the database is included in:


This file can be executed to generate the required database tables.

---

# Running the Project

## 1. Clone Repository

git clone https://github.com/yourusername/pcsm-material-request-system.git

cd pcsm-material-request-system


---

# Backend Setup
cd material-request-backend
npm install
npx prisma migrate dev
npm run start:dev

Backend server runs at: http://localhost:3000

---

# Frontend Setup
cd material-request-frontend
npm install
npm run dev

Frontend runs at: http://localhost:3001


---

# API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| GET | /requests | Get all requests |
| GET | /requests/:id | Get a request with materials |
| POST | /requests | Create a request |
| PUT | /requests/:id | Update request |
| DELETE | /requests/:id | Delete request |

---

# Validation

The backend uses `class-validator` to ensure data integrity.

Examples:

- requester cannot be empty
- department cannot be empty
- numeric fields validated before database operations

---

# Design Considerations

Some values such as `totalPrice` are calculated on the backend to maintain data consistency.

Example: totalPrice = quantity * unitPrice

This prevents manipulation from the client side.

---

# Submission Checklist

This repository includes:

- Full source code
- Frontend application
- Backend API
- SQL database schema
- Setup instructions

The GitHub repository link can be shared as part of the submission.