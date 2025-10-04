# HeavySync - Supplier & Purchase Order Management System

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-blue.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.4.0-38bdf8.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage Guide](#usage-guide)
- [PDF Generation](#pdf-generation)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🎯 Overview

**HeavySync** is a comprehensive full-stack web application designed to streamline supplier management and purchase order operations for businesses. The system provides an intuitive interface for managing supplier relationships, creating and tracking purchase orders, comparing quotations, and maintaining complete procurement lifecycle records with professional PDF generation capabilities.

### Purpose

The application solves common procurement challenges by:
- Centralizing supplier information and contact details
- Automating purchase order creation and tracking
- Enabling quotation comparison across multiple suppliers
- Maintaining audit trails with automatic timestamps
- Providing real-time order status updates
- **Generating professional PDF documents for purchase orders**
- **Modern, responsive UI with Tailwind CSS**

---

## ✨ Features

### Supplier Management
- ✅ **Create & Register Suppliers** - Add new suppliers with contact information
- ✅ **View Supplier Directory** - Browse all registered suppliers with modern card-based UI
- ✅ **Update Supplier Details** - Edit supplier information as needed
- ✅ **Delete Suppliers** - Remove suppliers from the system
- ✅ **Unique Email Validation** - Prevent duplicate supplier entries
- ✅ **Automatic Timestamps** - Track creation and modification dates

### Purchase Order Management
- ✅ **Create Purchase Orders** - Generate new POs linked to suppliers with dynamic item management
- ✅ **Multi-Item Orders** - Add/remove multiple items with real-time calculations
- ✅ **Automatic Calculations** - Total amounts calculated automatically as you type
- ✅ **Status Tracking** - Monitor order status (Pending, Approved, Received, Cancelled)
- ✅ **Order History** - View all purchase orders with supplier details
- ✅ **Update Orders** - Modify existing purchase orders
- ✅ **Order Cancellation** - Cancel orders when needed
- ✅ **Detailed Order View** - Click on any order to see complete details

### 📄 PDF Generation (NEW!)
- ✅ **Professional PDF Export** - Download purchase orders as formatted PDF documents
- ✅ **Company Branding** - PDF includes company header and styling
- ✅ **Itemized Tables** - Clear, organized display of order items
- ✅ **Supplier Information** - Complete supplier details in PDF
- ✅ **Order Metadata** - Order ID, date, status, and totals
- ✅ **Auto-Generated Filenames** - PDFs named with order ID and date
- ✅ **One-Click Download** - Download from list view or detail page

### 🎨 Modern UI (NEW!)
- ✅ **Tailwind CSS Styling** - Modern, clean, and responsive design
- ✅ **Card-based Layout** - Intuitive card displays for suppliers and orders
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile
- ✅ **Interactive Elements** - Hover effects, transitions, and animations
- ✅ **Form Validation** - Client-side validation with helpful error messages
- ✅ **Loading States** - Visual feedback during data operations

### Data Management
- ✅ **RESTful API** - Clean, standardized API endpoints
- ✅ **Data Validation** - Server-side and client-side validation for data integrity
- ✅ **Error Handling** - Comprehensive error messages and logging
- ✅ **MongoDB Integration** - Persistent data storage with relationships
- ✅ **Population** - Automatic supplier data population in purchase orders

---

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 14+ | Runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | Latest | NoSQL database (MongoDB Atlas cloud) |
| **Mongoose** | 8.18.3 | MongoDB ODM (Object Data Modeling) |
| **dotenv** | 17.2.3 | Environment variable management |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |
| **body-parser** | 2.2.0 | Request body parsing middleware |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | 18.2.0 | UI component library |
| **React Router** | 6.20.0 | Client-side routing |
| **React Scripts** | 5.0.1 | Create React App build tools |
| **Axios** | 1.6.2 | HTTP client for API requests |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS framework |
| **PostCSS** | 8.4.32 | CSS transformation tool |
| **Autoprefixer** | 10.4.16 | CSS vendor prefixing |
| **jsPDF** | 2.5.2 | PDF generation library |
| **jspdf-autotable** | 3.8.3 | PDF table generation plugin |

### Development Tools
- **PowerShell** - Command-line interface (Windows)
- **Git** - Version control
- **VS Code** - Code editor
- **Nodemon** (optional) - Development auto-restart utility

---

## 📁 Project Structure

```
HeavySync/
│
├── backend/                          # Backend server application
│   ├── config/
│   │   └── db.js                     # MongoDB connection configuration
│   │
│   ├── controllers/                  # Business logic layer
│   │   ├── supplierController.js     # Supplier CRUD operations
│   │   └── purchaseOrderController.js # Purchase order CRUD operations
│   │
│   ├── models/                       # Database schemas
│   │   ├── Supplier.js               # Supplier schema definition
│   │   └── PurchaseOrder.js          # Purchase order schema definition
│   │
│   ├── routes/                       # API route definitions
│   │   ├── supplierRoutes.js         # Supplier API endpoints
│   │   └── purchaseOrderRoutes.js    # Purchase order API endpoints
│   │
│   ├── .env                          # Environment variables (not in git)
│   ├── server.js                     # Express server entry point
│   ├── package.json                  # Backend dependencies
│   └── test-supplier.json            # Sample test data
│
└── frontend/                         # Frontend React application
    ├── public/                       # Static assets
    ├── src/
    │   ├── modules/
    │   │   └── supplier/             # Supplier module
    │   │       ├── components/       # Reusable React components
    │   │       │   ├── SupplierCard.jsx          # Supplier display card
    │   │       │   ├── PurchaseOrderCard.jsx     # PO display card
    │   │       │   └── QuotationTable.jsx        # Quotation comparison table
    │   │       │
    │   │       ├── pages/            # Page-level components
    │   │       │   ├── SupplierForm.jsx          # Create/edit supplier form
    │   │       │   ├── SupplierList.jsx          # Supplier listing page
    │   │       │   ├── PurchaseOrderForm.jsx     # Create/edit PO form
    │   │       │   ├── PurchaseOrderList.jsx     # PO listing page
    │   │       │   ├── PurchaseOrderDetail.jsx   # PO detail view page
    │   │       │   └── QuotationComparison.jsx   # Quotation comparison page
    │   │       │
    │   │       └── services/         # API service layer
    │   │           ├── supplierService.js        # Supplier API calls
    │   │           ├── purchaseOrderService.js   # PO API calls
    │   │           └── pdfService.js             # PDF generation service (NEW!)
    │   │
    │   ├── App.js                    # Main React component
    │   ├── App.css                   # Tailwind CSS styles (NEW!)
    │   └── index.js                  # React entry point
    │
    ├── tailwind.config.js            # Tailwind CSS configuration (NEW!)
    ├── postcss.config.js             # PostCSS configuration (NEW!)
    └── package.json                  # Frontend dependencies
```

---

## 🏗 System Architecture

### Architectural Pattern: MVC (Model-View-Controller)

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Pages     │  │  Components  │  │   Services   │      │
│  │              │  │              │  │              │      │
│  │ - Forms      │  │ - Cards      │  │ - API Calls  │      │
│  │ - Lists      │  │ - Tables     │  │ - Axios      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │
                    HTTP/REST API (JSON)
                             │
┌────────────────────────────┴────────────────────────────────┐
│                     BACKEND (Express.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Routes    │→ │ Controllers  │→ │    Models    │      │
│  │              │  │              │  │              │      │
│  │ - Endpoints  │  │ - Business   │  │ - Schemas    │      │
│  │ - Routing    │  │   Logic      │  │ - Validation │      │
│  └──────────────┘  └──────────────┘  └──────┬───────┘      │
└───────────────────────────────────────────────┼─────────────┘
                                                │
                                         Mongoose ODM
                                                │
┌───────────────────────────────────────────────┴─────────────┐
│                     DATABASE (MongoDB)                       │
│  ┌──────────────────┐          ┌──────────────────┐         │
│  │   Suppliers      │          │  Purchase Orders │         │
│  │   Collection     │          │   Collection     │         │
│  └──────────────────┘          └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow

1. **User Interaction** → User interacts with React components (forms, buttons, lists)
2. **Service Layer** → Service functions make HTTP requests using Axios
3. **API Routes** → Express routes receive requests and route to controllers
4. **Controller Logic** → Controllers execute business logic and interact with models
5. **Database Operations** → Mongoose models perform CRUD operations on MongoDB
6. **Response** → Data flows back through the same layers to the UI

---

## 🗄 Database Schema

### Supplier Collection

```javascript
{
  _id: ObjectId,                    // Auto-generated unique identifier
  name: String,                     // Supplier business name (required, trimmed)
  contactEmail: String,             // Email address (required, unique)
  contactPhone: String,             // Phone number (required)
  address: String,                  // Physical address (required)
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-updated timestamp
}
```

**Validation Rules:**
- `name`: Required, whitespace trimmed
- `contactEmail`: Required, must be unique across all suppliers
- `contactPhone`: Required
- `address`: Required
- Timestamps automatically managed by Mongoose

**Example Document:**
```json
{
  "_id": "65f8a9c4d1e2f3a4b5c6d7e8",
  "name": "ABC Manufacturing Ltd",
  "contactEmail": "contact@abcmfg.com",
  "contactPhone": "+1-555-0123",
  "address": "123 Industrial Park, Chicago, IL 60601",
  "createdAt": "2024-03-15T10:30:00.000Z",
  "updatedAt": "2024-03-15T10:30:00.000Z"
}
```

### Purchase Order Collection

```javascript
{
  _id: ObjectId,                    // Auto-generated unique identifier
  supplier: ObjectId,               // Reference to Supplier collection (required)
  items: [                          // Array of order items
    {
      name: String,                 // Item name (required)
      quantity: Number,             // Item quantity (required, min: 1)
      unitPrice: Number,            // Price per unit (required, min: 0)
      totalPrice: Number            // Calculated total (required, min: 0)
    }
  ],
  totalAmount: Number,              // Sum of all item totals (required, min: 0)
  status: String,                   // Order status (enum, default: "Pending")
  orderDate: Date,                  // Order creation date (default: now)
  receivedDate: Date,               // Date when order was received (optional)
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date                   // Auto-updated timestamp
}
```

**Status Enum Values:**
- `Pending` - Order created, awaiting approval
- `Approved` - Order approved, awaiting delivery
- `Received` - Order received and completed
- `Cancelled` - Order cancelled

**Validation Rules:**
- `supplier`: Must reference a valid Supplier document
- `items`: At least one item required
- `quantity`: Minimum value of 1
- `unitPrice` & `totalPrice`: Minimum value of 0
- `totalAmount`: Automatically calculated from items

**Example Document:**
```json
{
  "_id": "65f8b1c2d3e4f5a6b7c8d9e0",
  "supplier": "65f8a9c4d1e2f3a4b5c6d7e8",
  "items": [
    {
      "name": "Steel Pipes (3-inch)",
      "quantity": 100,
      "unitPrice": 25.50,
      "totalPrice": 2550.00
    },
    {
      "name": "Welding Rods",
      "quantity": 50,
      "unitPrice": 12.00,
      "totalPrice": 600.00
    }
  ],
  "totalAmount": 3150.00,
  "status": "Pending",
  "orderDate": "2024-03-15T14:20:00.000Z",
  "receivedDate": null,
  "createdAt": "2024-03-15T14:20:00.000Z",
  "updatedAt": "2024-03-15T14:20:00.000Z"
}
```

### Database Relationships

```
Supplier (One) ──────────────> Purchase Orders (Many)
    │                                  │
    │                                  │
    │ Referenced by                    │ Contains
    │ supplier field                   │ supplier ObjectId
    │                                  │
    └──────────────────────────────────┘
           (One-to-Many Relationship)
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### Supplier Endpoints

#### 1. Create Supplier
**POST** `/api/suppliers`

Creates a new supplier in the system.

**Request Body:**
```json
{
  "name": "ABC Manufacturing Ltd",
  "contactEmail": "contact@abcmfg.com",
  "contactPhone": "+1-555-0123",
  "address": "123 Industrial Park, Chicago, IL 60601"
}
```

**Success Response (201 Created):**
```json
{
  "_id": "65f8a9c4d1e2f3a4b5c6d7e8",
  "name": "ABC Manufacturing Ltd",
  "contactEmail": "contact@abcmfg.com",
  "contactPhone": "+1-555-0123",
  "address": "123 Industrial Park, Chicago, IL 60601",
  "createdAt": "2024-03-15T10:30:00.000Z",
  "updatedAt": "2024-03-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Supplier with email already exists
- `500 Internal Server Error` - Server error

---

#### 2. Get All Suppliers
**GET** `/api/suppliers`

Retrieves all suppliers from the database.

**Success Response (200 OK):**
```json
[
  {
    "_id": "65f8a9c4d1e2f3a4b5c6d7e8",
    "name": "ABC Manufacturing Ltd",
    "contactEmail": "contact@abcmfg.com",
    "contactPhone": "+1-555-0123",
    "address": "123 Industrial Park, Chicago, IL 60601",
    "createdAt": "2024-03-15T10:30:00.000Z",
    "updatedAt": "2024-03-15T10:30:00.000Z"
  },
  {
    "_id": "65f8aaf5e2f3g4h5i6j7k8l9",
    "name": "XYZ Supplies Inc",
    "contactEmail": "info@xyzsupplies.com",
    "contactPhone": "+1-555-0456",
    "address": "456 Commerce Blvd, New York, NY 10001",
    "createdAt": "2024-03-16T09:15:00.000Z",
    "updatedAt": "2024-03-16T09:15:00.000Z"
  }
]
```

---

#### 3. Get Supplier by ID
**GET** `/api/suppliers/:id`

Retrieves a specific supplier by their ID.

**URL Parameters:**
- `id` - Supplier's MongoDB ObjectId

**Success Response (200 OK):**
```json
{
  "_id": "65f8a9c4d1e2f3a4b5c6d7e8",
  "name": "ABC Manufacturing Ltd",
  "contactEmail": "contact@abcmfg.com",
  "contactPhone": "+1-555-0123",
  "address": "123 Industrial Park, Chicago, IL 60601",
  "createdAt": "2024-03-15T10:30:00.000Z",
  "updatedAt": "2024-03-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Supplier not found
- `500 Internal Server Error` - Server error

---

#### 4. Update Supplier
**PUT** `/api/suppliers/:id`

Updates an existing supplier's information.

**URL Parameters:**
- `id` - Supplier's MongoDB ObjectId

**Request Body:**
```json
{
  "name": "ABC Manufacturing Corporation",
  "contactPhone": "+1-555-9999"
}
```

**Success Response (200 OK):**
```json
{
  "_id": "65f8a9c4d1e2f3a4b5c6d7e8",
  "name": "ABC Manufacturing Corporation",
  "contactEmail": "contact@abcmfg.com",
  "contactPhone": "+1-555-9999",
  "address": "123 Industrial Park, Chicago, IL 60601",
  "createdAt": "2024-03-15T10:30:00.000Z",
  "updatedAt": "2024-03-15T16:45:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Supplier not found
- `500 Internal Server Error` - Server error

---

#### 5. Delete Supplier
**DELETE** `/api/suppliers/:id`

Deletes a supplier from the system.

**URL Parameters:**
- `id` - Supplier's MongoDB ObjectId

**Success Response (200 OK):**
```json
{
  "message": "Supplier deleted successfully"
}
```

**Error Responses:**
- `404 Not Found` - Supplier not found
- `500 Internal Server Error` - Server error

---

### Purchase Order Endpoints

#### 1. Create Purchase Order
**POST** `/api/purchase-orders`

Creates a new purchase order.

**Request Body:**
```json
{
  "supplier": "65f8a9c4d1e2f3a4b5c6d7e8",
  "items": [
    {
      "name": "Steel Pipes (3-inch)",
      "quantity": 100,
      "unitPrice": 25.50,
      "totalPrice": 2550.00
    },
    {
      "name": "Welding Rods",
      "quantity": 50,
      "unitPrice": 12.00,
      "totalPrice": 600.00
    }
  ]
}
```

**Success Response (201 Created):**
```json
{
  "_id": "65f8b1c2d3e4f5a6b7c8d9e0",
  "supplier": "65f8a9c4d1e2f3a4b5c6d7e8",
  "items": [
    {
      "name": "Steel Pipes (3-inch)",
      "quantity": 100,
      "unitPrice": 25.50,
      "totalPrice": 2550.00
    },
    {
      "name": "Welding Rods",
      "quantity": 50,
      "unitPrice": 12.00,
      "totalPrice": 600.00
    }
  ],
  "totalAmount": 3150.00,
  "status": "Pending",
  "orderDate": "2024-03-15T14:20:00.000Z",
  "createdAt": "2024-03-15T14:20:00.000Z",
  "updatedAt": "2024-03-15T14:20:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Supplier not found or invalid data
- `500 Internal Server Error` - Server error

---

#### 2. Get All Purchase Orders
**GET** `/api/purchase-orders`

Retrieves all purchase orders with populated supplier information.

**Success Response (200 OK):**
```json
[
  {
    "_id": "65f8b1c2d3e4f5a6b7c8d9e0",
    "supplier": {
      "_id": "65f8a9c4d1e2f3a4b5c6d7e8",
      "name": "ABC Manufacturing Ltd",
      "contactEmail": "contact@abcmfg.com",
      "contactPhone": "+1-555-0123"
    },
    "items": [
      {
        "name": "Steel Pipes (3-inch)",
        "quantity": 100,
        "unitPrice": 25.50,
        "totalPrice": 2550.00
      }
    ],
    "totalAmount": 2550.00,
    "status": "Pending",
    "orderDate": "2024-03-15T14:20:00.000Z",
    "createdAt": "2024-03-15T14:20:00.000Z",
    "updatedAt": "2024-03-15T14:20:00.000Z"
  }
]
```

---

#### 3. Get Purchase Order by ID
**GET** `/api/purchase-orders/:id`

Retrieves a specific purchase order by ID with populated supplier details.

**URL Parameters:**
- `id` - Purchase Order's MongoDB ObjectId

**Success Response (200 OK):**
```json
{
  "_id": "65f8b1c2d3e4f5a6b7c8d9e0",
  "supplier": {
    "_id": "65f8a9c4d1e2f3a4b5c6d7e8",
    "name": "ABC Manufacturing Ltd",
    "contactEmail": "contact@abcmfg.com",
    "contactPhone": "+1-555-0123"
  },
  "items": [
    {
      "name": "Steel Pipes (3-inch)",
      "quantity": 100,
      "unitPrice": 25.50,
      "totalPrice": 2550.00
    }
  ],
  "totalAmount": 2550.00,
  "status": "Approved",
  "orderDate": "2024-03-15T14:20:00.000Z",
  "createdAt": "2024-03-15T14:20:00.000Z",
  "updatedAt": "2024-03-16T08:30:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Purchase order not found
- `500 Internal Server Error` - Server error

---

#### 4. Update Purchase Order
**PUT** `/api/purchase-orders/:id`

Updates an existing purchase order.

**URL Parameters:**
- `id` - Purchase Order's MongoDB ObjectId

**Request Body:**
```json
{
  "status": "Approved",
  "items": [
    {
      "name": "Steel Pipes (3-inch)",
      "quantity": 120,
      "unitPrice": 25.50,
      "totalPrice": 3060.00
    }
  ],
  "totalAmount": 3060.00
}
```

**Success Response (200 OK):**
```json
{
  "_id": "65f8b1c2d3e4f5a6b7c8d9e0",
  "supplier": "65f8a9c4d1e2f3a4b5c6d7e8",
  "items": [
    {
      "name": "Steel Pipes (3-inch)",
      "quantity": 120,
      "unitPrice": 25.50,
      "totalPrice": 3060.00
    }
  ],
  "totalAmount": 3060.00,
  "status": "Approved",
  "orderDate": "2024-03-15T14:20:00.000Z",
  "createdAt": "2024-03-15T14:20:00.000Z",
  "updatedAt": "2024-03-16T10:15:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Purchase order not found
- `500 Internal Server Error` - Server error

---

#### 5. Delete Purchase Order
**DELETE** `/api/purchase-orders/:id`

Deletes a purchase order from the system.

**URL Parameters:**
- `id` - Purchase Order's MongoDB ObjectId

**Success Response (200 OK):**
```json
{
  "message": "Purchase order deleted successfully"
}
```

**Error Responses:**
- `404 Not Found` - Purchase order not found
- `500 Internal Server Error` - Server error

---

## ⚙️ Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **PowerShell** (Windows) or Terminal (Mac/Linux)

### Step 1: Clone the Repository

```powershell
git clone https://github.com/Hasintha01/HeavySync.git
cd HeavySync
```

### Step 2: Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```powershell
# Windows PowerShell
New-Item -Path . -Name ".env" -ItemType "file"
```

Edit the `.env` file with your MongoDB Atlas credentials:

```env
# MongoDB Atlas Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/heavysync

# Server Port
PORT=5000

# JWT Secret (optional, for future authentication)
JWT_SECRET=your_jwt_secret_key_here
```

**To get your MongoDB Atlas connection string:**
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<username>` with your database username

### Step 4: Start the Backend Server

```powershell
# Make sure you're in the backend directory
cd backend

# Start the server
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected Successfully!
```

### Step 5: Frontend Setup (New Terminal)

Open a **new terminal/PowerShell window**:

```powershell
# Navigate to frontend directory
cd HeavySync/frontend

# Install dependencies (this may take a few minutes)
npm install
```

**Note:** This will install approximately 1,345 packages including React, Tailwind CSS, and jsPDF libraries.

### Step 6: Start the Frontend Server

```powershell
# Make sure you're in the frontend directory
npm start
```

The application will automatically open at `http://localhost:3000`

You should see:
```
Compiled successfully!

You can now view heavysync-frontend in the browser.

  Local:            http://localhost:3000
```

### Step 7: Verify Installation

**Backend Test:**
```powershell
# Test server is running
curl http://localhost:5000/

# Should return: "HeavySync Backend Running!"

# Test supplier endpoint
curl http://localhost:5000/api/suppliers

# Should return: [] (empty array initially)
```

**Frontend Test:**
- Open browser to `http://localhost:3000`
- You should see the HeavySync application with navigation menu
- Try navigating to "Suppliers" and "Purchase Orders"

### Common Installation Issues

#### Issue: `react-scripts` errors
**Solution:** Make sure package.json has `"react-scripts": "5.0.1"` (not "^0.0.0")

#### Issue: MongoDB connection failed
**Solution:** 
- Verify your MongoDB Atlas connection string in `.env`
- Check that your IP address is whitelisted in MongoDB Atlas Network Access
- Ensure database user credentials are correct

#### Issue: Port already in use
**Solution:**
```powershell
# Kill Node processes
taskkill /F /IM node.exe /T

# Then restart the servers
```

#### Issue: CSS warnings about @tailwind
**Solution:** These are harmless VS Code linting warnings. The app works correctly. Add to `.vscode/settings.json`:
```json
{
  "css.lint.unknownAtRules": "ignore"
}
```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/heavysync` | ✅ Yes |
| `PORT` | Server port number | `5000` | ✅ Yes |
| `JWT_SECRET` | Secret key for JWT tokens | `your_secret_key` | ⚠️ Optional (future use) |
| `NODE_ENV` | Environment mode | `development` or `production` | ⚠️ Optional |

### Frontend Configuration

The frontend is configured to proxy API requests to `http://localhost:5000` as specified in `package.json`:

```json
{
  "proxy": "http://localhost:5000"
}
```

### Security Notes

- ⚠️ **Never commit `.env` files to version control** - Already in `.gitignore`
- 🔒 Use strong passwords for production databases
- 🌐 For production, use environment-specific connection strings
- 🔑 Whitelist only necessary IP addresses in MongoDB Atlas
- 🛡️ Keep MongoDB Atlas credentials secure

---

## 📄 PDF Generation

HeavySync includes a powerful PDF generation feature for creating professional purchase order documents.

### Features

- **Professional Formatting** - Clean, branded PDF layout
- **Company Header** - Dark header with "PURCHASE ORDER" title
- **Order Information** - Order ID, date, and status
- **Supplier Details** - Complete supplier contact information
- **Itemized Table** - Stripe-styled table with all order items
- **Automatic Calculations** - Quantities, unit prices, and totals
- **Status Color Coding** - Visual status indicators (Pending/Approved/Received/Cancelled)
- **Auto-Generated Filenames** - Format: `PurchaseOrder_[ID]_[Date].pdf`
- **Metadata** - PDF properties including title, author, and generation timestamp

### How to Generate PDFs

#### Method 1: From Purchase Order List
1. Navigate to "Purchase Orders" page
2. Find the order you want to download
3. Click the **"Download PDF"** button on the order card
4. PDF will automatically download to your Downloads folder

#### Method 2: From Purchase Order Detail View
1. Click on any purchase order card to view details
2. Click the **"Download PDF"** button at the top
3. PDF will automatically download

### PDF Structure

```
┌─────────────────────────────────────────────────┐
│          PURCHASE ORDER (Dark Header)           │
│    HeavySync - Supplier Management System      │
│          Procurement Department                 │
├─────────────────────────────────────────────────┤
│  Order ID: #12345678                           │
│  Order Date: March 15, 2024                    │
│  Status: Pending (color-coded)                 │
├─────────────────────────────────────────────────┤
│  SUPPLIER INFORMATION                          │
│  Name: ABC Manufacturing Ltd                   │
│  Email: contact@abcmfg.com                    │
│  Phone: +1-555-0123                           │
│  Address: 123 Industrial Park, Chicago         │
├─────────────────────────────────────────────────┤
│  ORDER ITEMS (Striped Table)                   │
│  ┌────┬──────────┬────┬───────┬────────┐      │
│  │ #  │ Item     │ Qty│ Price │ Total  │      │
│  ├────┼──────────┼────┼───────┼────────┤      │
│  │ 1  │ Steel... │100 │$25.50 │$2550.00│      │
│  └────┴──────────┴────┴───────┴────────┘      │
├─────────────────────────────────────────────────┤
│            TOTAL AMOUNT: $2,550.00             │
├─────────────────────────────────────────────────┤
│  This is a computer-generated document.        │
│  Generated on: October 4, 2025 10:30:45 AM   │
│  HeavySync - Supplier & PO Management System   │
└─────────────────────────────────────────────────┘
```

### Technical Implementation

**Libraries Used:**
- `jsPDF 2.5.2` - Core PDF generation
- `jspdf-autotable 3.8.3` - Table generation

**Key Features:**
- A4 page size
- Professional typography and spacing
- Color-coded status indicators
- Responsive table layouts
- Footer with generation timestamp
- Document metadata (title, author, keywords)

### Customization

To customize the PDF appearance, edit `frontend/src/modules/supplier/services/pdfService.js`:

```javascript
// Change company name
doc.text('Your Company Name', 105, 25, { align: 'center' });

// Modify header colors
doc.setFillColor(40, 44, 52); // RGB values

// Adjust table styling
headStyles: {
  fillColor: [40, 44, 52], // Header color
  textColor: [255, 255, 255], // Text color
}
```

---

## 📘 Usage Guide

### Creating a Supplier

1. Navigate to the **Supplier Form** page from the navigation menu
2. Fill in the required fields:
   - **Name**: Business name of the supplier (required)
   - **Contact Email**: Unique email address (required)
   - **Contact Phone**: Phone number (required)
   - **Address**: Physical address (required)
3. Click **"Create Supplier"** button
4. Success message will appear
5. The supplier will be saved and appear in the supplier list

### Viewing Suppliers

1. Click **"Suppliers"** in the navigation menu
2. All suppliers are displayed as cards
3. Each card shows:
   - Supplier name
   - Email and phone
   - Address
   - Creation date
4. Hover over cards for visual feedback

### Creating a Purchase Order

1. Navigate to the Purchase Order Form page
2. Select a supplier from the dropdown
3. Add items to the order:
   - **Item Name**: Description of the item
   - **Quantity**: Number of units
   - **Unit Price**: Price per unit
   - **Total Price**: Automatically calculated
4. Review the total amount
5. Click "Submit" or "Create Order"
6. The order will be created with "Pending" status

### Comparing Quotations

1. Navigate to the Quotation Comparison page
2. The system displays quotes from different suppliers
3. Compare prices, terms, and conditions
4. Make informed purchasing decisions

### Managing Purchase Orders

**Update Order Status:**
- View purchase order details
- Update status to: Pending → Approved → Received
- Or cancel the order if needed

**Track Orders:**
- View all orders in the Purchase Order List
- Filter by status or supplier
- Check order dates and received dates

---

## 🚀 Development

### Running Tests

```powershell
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Structure Best Practices

1. **Controllers**: Keep business logic separate from routes
2. **Models**: Define clear schemas with validation
3. **Services**: Frontend service layer for API abstraction
4. **Components**: Reusable UI components
5. **Error Handling**: Comprehensive try-catch blocks

### Adding New Features

1. **Backend**:
   - Create model in `/backend/models/`
   - Create controller in `/backend/controllers/`
   - Define routes in `/backend/routes/`
   - Register routes in `server.js`

2. **Frontend**:
   - Create service in `/frontend/src/modules/supplier/services/`
   - Create components in `/frontend/src/modules/supplier/components/`
   - Create pages in `/frontend/src/modules/supplier/pages/`

### Development Commands

```powershell
# Backend
npm run dev          # Start with nodemon (auto-restart)
npm start            # Start normally

# Frontend
npm start            # Start React development server
npm run build        # Build for production
npm run lint         # Run linter
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint rules
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation for new features
- Write tests for new functionality

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Hasintha** - [GitHub Profile](https://github.com/Hasintha01)

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Issues

**Problem**: "MongoDB Connection Failed" or "MongoServerError"

**Solutions**:
- **MongoDB Atlas**: 
  - Verify your connection string in `.env` is correct
  - Check that your IP address is whitelisted in Network Access
  - Ensure database user credentials are correct (username/password)
  - Confirm the database name in the connection string matches
- **Connection String Format**: Should be `mongodb+srv://username:password@cluster.mongodb.net/heavysync`

#### 2. Port Already in Use

**Problem**: "Port 5000 is already in use" or "EADDRINUSE"

**Solutions**:
```powershell
# Kill all Node processes
taskkill /F /IM node.exe /T

# Or find specific process using port 5000
netstat -ano | findstr :5000

# Kill specific process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Alternative: Change PORT in .env file to 5001 or another port
```

#### 3. Frontend Won't Start / Webpack Errors

**Problem**: "react-scripts: command not found" or webpack compilation errors

**Solutions**:
```powershell
# Delete node_modules and reinstall
cd frontend
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue
npm install

# Verify react-scripts version in package.json is "5.0.1" (not "^0.0.0")
```

#### 4. PDF Generation Fails

**Problem**: "Failed to generate PDF" error or blank PDF

**Solutions**:
- Ensure you have the latest version with jsPDF installed
- Check browser console (F12) for detailed error messages
- Verify order has items and supplier data populated
- Clear browser cache and refresh: `Ctrl+F5`

#### 5. Duplicate Key Error on Purchase Orders

**Problem**: "E11000 duplicate key error collection: heavysync.purchaseorders index: orderId_1"

**Solution**: This was fixed by dropping the old index. If you encounter it:
```javascript
// Run this in MongoDB Shell or Compass
db.purchaseorders.dropIndex("orderId_1");
```

#### 6. CORS Issues

**Problem**: Frontend can't connect to backend, "CORS policy" errors

**Solutions**:
- Verify CORS is enabled in `backend/server.js`
- Check `proxy` setting in `frontend/package.json` points to `http://localhost:5000`
- Ensure backend server is running before starting frontend
- Clear browser cache

#### 7. CSS Warnings: "Unknown at rule @tailwind"

**Problem**: VS Code shows warnings about @tailwind and @apply directives

**Solution**: These are **harmless linting warnings**. To hide them:
1. Create `.vscode/settings.json` in project root
2. Add:
```json
{
  "css.lint.unknownAtRules": "ignore"
}
```
Or install the "Tailwind CSS IntelliSense" VS Code extension.

#### 8. Request Failed with Status Code 500

**Problem**: Creating supplier or purchase order returns 500 error

**Solutions**:
- Check backend terminal for detailed error logs
- Verify all required fields are filled in the form
- Ensure MongoDB connection is active
- Check backend controller validation rules
- Look for validation errors in browser console (F12)

#### 9. Frontend Shows Blank Page

**Problem**: localhost:3000 loads but shows blank white page

**Solutions**:
```powershell
# Check browser console (F12) for JavaScript errors
# Verify frontend server is running without errors
# Check if build compilation completed successfully

# If needed, rebuild
cd frontend
npm run build
npm start
```

#### 10. Dependencies Installation Takes Too Long

**Problem**: npm install seems stuck or very slow

**Solutions**:
```powershell
# Use --verbose flag to see progress
npm install --verbose

# Or try using different registry
npm install --registry=https://registry.npmjs.org/

# Clear cache and retry
npm cache clean --force
npm install
```

### Getting Help

If you encounter issues not listed here:

1. **Check Backend Logs**: Look at the terminal running `npm start` in backend
2. **Check Browser Console**: Press F12 → Console tab for frontend errors
3. **Check Network Tab**: F12 → Network tab to see failed API requests
4. **Enable Detailed Logging**: Add console.log statements in code
5. **GitHub Issues**: Open an issue with error details and steps to reproduce

---

## 📞 Support

For support, please:
- Open an issue on [GitHub](https://github.com/Hasintha01/HeavySync/issues)
- Provide detailed error messages and steps to reproduce
- Include your Node.js version: `node --version`
- Include your npm version: `npm --version`

---

## 🎓 Additional Resources

### Documentation
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [jsPDF Documentation](https://github.com/parallax/jsPDF)

### Tutorials
- [MongoDB Atlas Setup Guide](https://www.mongodb.com/docs/atlas/getting-started/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Tailwind CSS Installation](https://tailwindcss.com/docs/installation)

---

## 📊 Project Status

### ✅ Completed Features
- ✅ Core supplier management (CRUD operations)
- ✅ Purchase order system (full CRUD)
- ✅ RESTful API with validation
- ✅ MongoDB Atlas integration
- ✅ React frontend with routing
- ✅ Tailwind CSS styling
- ✅ PDF generation for purchase orders
- ✅ Dynamic item management in orders
- ✅ Auto-calculation of totals
- ✅ Supplier population in orders
- ✅ Status tracking (Pending/Approved/Received/Cancelled)
- ✅ Error handling and validation
- ✅ Responsive card-based UI

### 🚧 In Progress
- 🚧 Advanced quotation comparison features
- 🚧 Enhanced filtering and search
- 🚧 User authentication system

### 📋 Planned Features
- [ ] User authentication and authorization (JWT)
- [ ] Role-based access control (Admin/User/Viewer)
- [ ] Email notifications for order updates
- [ ] Advanced dashboard with analytics and charts
- [ ] Advanced search and filtering options
- [ ] Inventory management integration
- [ ] Payment tracking and invoicing
- [ ] Multi-currency support
- [ ] Audit logs and history tracking
- [ ] Export to Excel/CSV
- [ ] Batch operations (bulk updates/deletes)
- [ ] API rate limiting
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

---


## 🏆 Achievements

- **Modern Tech Stack**: Built with latest versions of React, Node.js, and MongoDB
- **Professional UI**: Tailwind CSS for modern, responsive design
- **PDF Generation**: Professional document creation with jsPDF
- **Clean Architecture**: MVC pattern with clear separation of concerns
- **API Design**: RESTful endpoints following best practices
- **Error Handling**: Comprehensive validation and error messages
- **Type Safety**: Mongoose schemas with validation rules
- **Real-time Updates**: Dynamic calculations and instant feedback
- **Developer Experience**: Well-documented codebase with comments

---

**Made with ❤️ using Node.js, Express, MongoDB, React, and Tailwind CSS**

---

*Last Updated: October 4, 2025*
