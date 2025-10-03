# HeavySync - Supplier & Purchase Order Management System

![Status](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-blue.svg)
![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)

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
- [Development](#development)
- [Contributing](#contributing)

---

## 🎯 Overview

**HeavySync** is a comprehensive full-stack web application designed to streamline supplier management and purchase order operations for businesses. The system provides an intuitive interface for managing supplier relationships, creating and tracking purchase orders, comparing quotations, and maintaining complete procurement lifecycle records.

### Purpose

The application solves common procurement challenges by:
- Centralizing supplier information and contact details
- Automating purchase order creation and tracking
- Enabling quotation comparison across multiple suppliers
- Maintaining audit trails with automatic timestamps
- Providing real-time order status updates

---

## ✨ Features

### Supplier Management
- ✅ **Create & Register Suppliers** - Add new suppliers with contact information
- ✅ **View Supplier Directory** - Browse all registered suppliers
- ✅ **Update Supplier Details** - Edit supplier information as needed
- ✅ **Delete Suppliers** - Remove suppliers from the system
- ✅ **Unique Email Validation** - Prevent duplicate supplier entries
- ✅ **Automatic Timestamps** - Track creation and modification dates

### Purchase Order Management
- ✅ **Create Purchase Orders** - Generate new POs linked to suppliers
- ✅ **Multi-Item Orders** - Add multiple items with quantities and prices
- ✅ **Automatic Calculations** - Total amounts calculated automatically
- ✅ **Status Tracking** - Monitor order status (Pending, Approved, Received, Cancelled)
- ✅ **Order History** - View all purchase orders with supplier details
- ✅ **Update Orders** - Modify existing purchase orders
- ✅ **Order Cancellation** - Cancel orders when needed

### Quotation Management
- ✅ **Quotation Comparison** - Compare quotes from different suppliers
- ✅ **Price Analysis** - Analyze pricing across suppliers for better decisions
- ✅ **Quotation Tables** - Organized display of quotations

### Data Management
- ✅ **RESTful API** - Clean, standardized API endpoints
- ✅ **Data Validation** - Server-side validation for data integrity
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **MongoDB Integration** - Persistent data storage with relationships

---

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 14+ | Runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | 8.18.3 | NoSQL database |
| **Mongoose** | 8.18.3 | MongoDB ODM (Object Data Modeling) |
| **dotenv** | 17.2.3 | Environment variable management |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |
| **body-parser** | 2.2.0 | Request body parsing middleware |
| **nodemon** | 3.1.10 | Development auto-restart utility |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI component library |
| **Axios** | HTTP client for API requests |
| **JSX** | JavaScript XML syntax |
| **ES6+** | Modern JavaScript features |

### Development Tools
- **PowerShell** - Command-line interface (Windows)
- **Git** - Version control
- **VS Code** - Code editor
- **Postman** (optional) - API testing

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
│   ├── server.js                     # Express server entry point
│   ├── package.json                  # Backend dependencies
│   └── test-supplier.json            # Sample test data
│
└── frontend/                         # Frontend React application
    └── src/
        └── modules/
            └── supplier/             # Supplier module
                ├── components/       # Reusable React components
                │   ├── SupplierCard.jsx          # Supplier display card
                │   ├── PurchaseOrderCard.jsx     # PO display card
                │   └── QuotationTable.jsx        # Quotation comparison table
                │
                ├── pages/            # Page-level components
                │   ├── SupplierForm.jsx          # Create/edit supplier form
                │   ├── SupplierList.jsx          # Supplier listing page
                │   ├── PurchaseOrderForm.jsx     # Create/edit PO form
                │   ├── PurchaseOrderList.jsx     # PO listing page
                │   └── QuotationComparison.jsx   # Quotation comparison page
                │
                └── services/         # API service layer
                    ├── supplierService.js        # Supplier API calls
                    └── purchaseOrderService.js   # PO API calls
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
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

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

# Create .env file
New-Item -Path . -Name ".env" -ItemType "file"
```

### Step 3: Configure Environment Variables

Edit the `.env` file in the `backend` directory:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/heavysync

# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/heavysync

# Server Port
PORT=5000
```

### Step 4: Start MongoDB

**For Local MongoDB:**
```powershell
# Start MongoDB service (Windows)
net start MongoDB
```

**For MongoDB Atlas:**
- Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string and add it to `.env`

### Step 5: Start the Backend Server

```powershell
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected Successfully!
```

### Step 6: Frontend Setup

```powershell
# Open a new terminal
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

### Step 7: Verify Installation

Test the backend API:
```powershell
# Test server is running
curl http://localhost:5000/

# Test supplier endpoint
curl http://localhost:5000/api/suppliers
```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/heavysync` |
| `PORT` | Server port number | `5000` |
| `NODE_ENV` | Environment (development/production) | `development` |

### Security Notes

- ⚠️ Never commit `.env` files to version control
- 🔒 Use strong passwords for production databases
- 🌐 For production, use environment-specific connection strings
- 🔑 Consider using secrets management tools for sensitive data

---

## 📘 Usage Guide

### Creating a Supplier

1. Navigate to the Supplier Form page
2. Fill in the required fields:
   - **Name**: Business name of the supplier
   - **Contact Email**: Unique email address
   - **Contact Phone**: Phone number
   - **Address**: Physical address
3. Click "Submit" or "Create Supplier"
4. The supplier will be saved and appear in the supplier list

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

## 🐛 Known Issues & Troubleshooting

### MongoDB Connection Issues

**Problem**: "MongoDB Connection Failed"

**Solutions**:
- Verify MongoDB is running: `net start MongoDB`
- Check MONGO_URI in `.env` file
- Ensure MongoDB is accessible on the specified port
- For Atlas: Check network access and IP whitelist

### Port Already in Use

**Problem**: "Port 5000 is already in use"

**Solutions**:
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change PORT in .env file
```

### CORS Issues

**Problem**: Frontend can't connect to backend

**Solutions**:
- Verify CORS is enabled in `server.js`
- Check frontend is using correct API URL
- Ensure backend is running on the expected port

### Dependency Installation Fails

**Problem**: npm install errors

**Solutions**:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install
```

---

## 📞 Support

For support, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

## 🎓 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

## 📊 Project Status

- ✅ Core supplier management implemented
- ✅ Purchase order system functional
- ✅ RESTful API complete
- ✅ Database models defined
- 🚧 Frontend UI under development
- 📋 Quotation comparison in progress

---

## 🔮 Future Enhancements

- [ ] User authentication and authorization
- [ ] Email notifications for order updates
- [ ] PDF report generation for purchase orders
- [ ] Advanced search and filtering
- [ ] Dashboard with analytics and charts
- [ ] Inventory management integration
- [ ] Payment tracking
- [ ] Multi-currency support
- [ ] Audit logs and history tracking
- [ ] Mobile responsive design improvements

---

**Made with ❤️ using Node.js, Express, MongoDB, and React**

---

*Last Updated: October 3, 2025*
