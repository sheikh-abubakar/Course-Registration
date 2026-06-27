# 📚 Course Registration System

<div align="center">

![Course Registration Banner](https://img.shields.io/badge/Course%20Registration-System-6366f1?style=for-the-badge&logo=bookstack&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20App-22c55e?style=for-the-badge)](https://course-registration-2i6z.vercel.app/)
[![Backend API](https://img.shields.io/badge/🚀%20Backend%20API-Render-0ea5e9?style=for-the-badge)](https://your-backend.onrender.com)

---

![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-K8s%20Ready-326CE5?style=flat-square&logo=kubernetes&logoColor=white)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
![Jest](https://img.shields.io/badge/Tests-Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## ✨ Live Preview

<div align="center">

### 🌐 [https://course-registration-2i6z.vercel.app/](https://course-registration-2i6z.vercel.app/)

</div>

A full-stack **Course Registration System** with role-based authentication, built with the MERN stack and deployed with a complete modern DevOps pipeline — Docker, CI/CD via GitHub Actions, and Kubernetes-ready manifests.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT                              │
│            React + Vite (Vercel)                        │
└──────────────────────┬──────────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────────┐
│                    BACKEND                              │
│           Node.js + Express (Render)                    │
│                                                         │
│   /api/auth        /api/courses      /api/registrations │
└──────────────────────┬──────────────────────────────────┘
                       │ Mongoose
┌──────────────────────▼──────────────────────────────────┐
│                   DATABASE                              │
│               MongoDB Atlas (Cloud)                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Features

- 🔐 **JWT Authentication** — Secure login & registration
- 👥 **Role-based Access** — Admin and Student roles
- 📖 **Course Management** — Browse, enroll, and manage courses
- 📋 **Registration Tracking** — Real-time enrollment status
- 🐳 **Dockerized** — Fully containerized backend
- ⚙️ **CI/CD Pipeline** — Automated testing & deployment via GitHub Actions
- ☸️ **Kubernetes Ready** — K8s manifests included for production scaling
- 🧪 **Automated Tests** — Jest + Supertest

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Auth** | JWT, bcryptjs |
| **Containerization** | Docker, Docker Compose |
| **Orchestration** | Kubernetes (Minikube locally) |
| **CI/CD** | GitHub Actions |
| **Testing** | Jest, Supertest |
| **Deployment** | Vercel (FE), Render (BE) |

---

## 📁 Project Structure

```
course-registration/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/            # Route controllers
│   ├── middleware/             # Auth middleware
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   ├── __tests__/
│   │   └── app.test.js         # Jest tests
│   ├── k8s/
│   │   ├── deployment.yaml     # K8s Deployment manifest
│   │   └── service.yaml        # K8s Service manifest
│   ├── .dockerignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── src/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Docker Desktop (for Docker setup)

### Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

---

## 🖥️ Run Locally — Traditional Way

```bash
# 1. Clone the repo
git clone https://github.com/sheikh-abubakar/Course-Registration.git
cd Course-Registration

# 2. Backend setup
cd backend
npm install
npm run dev
# Backend running at http://localhost:5000

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev
# Frontend running at http://localhost:5173
```

---

## 🐳 Run with Docker

### Option A — Backend Only (Docker + local frontend)

```bash
cd backend
docker build -t course-reg-backend .
docker run -p 5000:5000 --env-file .env course-reg-backend
```

### Option B — Full Stack with Docker Compose

```bash
cd backend
docker-compose up -d
```

**Useful Docker commands:**

```bash
docker-compose ps          # Check status
docker-compose logs -f     # Live logs
docker-compose down        # Stop containers
docker-compose up -d --build  # Rebuild and restart
```

---

## ☸️ Kubernetes Deployment (Local with Minikube)

```bash
# 1. Start Minikube
minikube start

# 2. Load image into Minikube
minikube image load course-reg-backend:latest

# 3. Create secret
kubectl create secret generic app-secrets \
  --from-literal=mongo-uri="your_mongodb_uri"

# 4. Deploy
kubectl apply -f backend/k8s/deployment.yaml
kubectl apply -f backend/k8s/service.yaml

# 5. Access the app
minikube service backend-service --url

# 6. Scale pods
kubectl scale deployment backend-deployment --replicas=5

# 7. Check status
kubectl get pods
kubectl get services
```

---

## 🔄 CI/CD Pipeline

Every push to `main` triggers the GitHub Actions pipeline:

```
git push → GitHub Actions
              │
              ├── ✅ Checkout code
              ├── ✅ Setup Node.js 18
              ├── ✅ Install dependencies
              ├── ✅ Syntax check
              ├── ✅ Run Jest tests
              └── ✅ Docker build verify
                        │
                        ▼
                   Render Auto-Deploy
                   (Backend goes live)
```

Branch protection ensures **only CI-verified code** merges to `main`.

---

## 🧪 Running Tests

```bash
cd backend
npm test
```


---

## 👨‍💻 Author

**Muhammad Abubakar**

[![GitHub](https://img.shields.io/badge/GitHub-sheikh--abubakar-181717?style=flat-square&logo=github)](https://github.com/sheikh-abubakar)

---

<div align="center">

Made with ❤️ | PUCIT, University of the Punjab

</div>
