# HeavySync - Supplier & Purchase Order Management System

A full-stack application for managing suppliers, parts, purchase orders, and quotations.

## Tech Stack

**Frontend:** React 18.2.0  
**Backend:** Node.js with Express 5.1.0  
**Database:** MongoDB (Mongoose 8.18.3)

## Key Libraries

### Frontend
- **UI Framework:** React 18.2.0, React Router DOM 6.20.0
- **Styling:** TailwindCSS 3.4.0
- **Icons:** React Icons 5.5.0
- **Notifications:** React Hot Toast 2.6.0
- **PDF Generation:** jsPDF 2.5.2, jsPDF-AutoTable 3.8.3
- **HTTP Client:** Axios 1.6.2

### Backend
- **Server:** Express 5.1.0
- **Database:** Mongoose 8.18.3
- **Middleware:** CORS 2.8.5, Body-Parser 2.2.0
- **Environment:** dotenv 17.2.3
- **Dev Tool:** Nodemon 3.1.10

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone & Install

```bash
git clone <repository-url>
cd HeavySync
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/heavysync
PORT=5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend (Port 5000)
```bash
cd backend
npm run dev
```

### Start Frontend (Port 3000)
```bash
cd frontend
npm start
```

Access the application at `http://localhost:3000`