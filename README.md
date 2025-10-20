# HeavySync

HeavySync is a full-stack web application designed to streamline the management of suppliers, parts, quotations, and purchase orders for businesses. It provides a secure, user-friendly interface for both administrators and staff to handle procurement workflows efficiently.

## Features
- **User Authentication:** Register, login, and manage user profiles securely.
- **Supplier Management:** Add, edit, view, and delete supplier information.
- **Part Management:** Manage inventory parts, including details and supplier associations.
- **Low Stock Alerts:** Instantly see which parts are low in stock on the Parts Inventory page, highlighted for quick action.
- **Quotation Handling:** Request, compare, and manage quotations from suppliers.
- **Purchase Orders:** Create, track, and report on purchase orders.
- **Reporting:** Generate and export reports (PDF) for quotations and purchase orders.
- **CSV Export:** Export supplier and part lists to CSV for use in Excel or other tools.
- **Role-Based Access:** Protect sensitive routes and actions based on user roles.
- **Responsive UI:** Clean, modern interface with mobile support.

## Tech Stack
- **Frontend:** React, Tailwind CSS, React Router, Axios, jsPDF
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Other:** JWT for authentication, CORS, dotenv

## Project Structure
```
HeavySync/
├── backend/      # Node.js/Express API server
│   ├── config/   # Database configuration
│   ├── controllers/  # Route controllers (business logic)
│   ├── middleware/   # Auth and other middleware
│   ├── models/       # Mongoose schemas/models
│   ├── routes/       # API route definitions
│   ├── package.json  # Backend dependencies
│   └── server.js     # Entry point
├── frontend/     # React client app
│   ├── build/    # Production build output
│   ├── public/   # Static files
│   ├── src/      # Source code
│   │   ├── components/  # Shared UI components
│   │   ├── modules/     # Feature modules (auth, supplier, etc.)
│   ├── package.json     # Frontend dependencies
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm (or yarn)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure MongoDB connection in `config/db.js` or via environment variables (e.g., `.env`):
   ```env
   MONGO_URI=mongodb://localhost:27017/heavysync
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

## Usage
- Open your browser and go to `http://localhost:3000` for the frontend.
- The backend API runs on `http://localhost:5000` by default.
- Register a new user or login with existing credentials.
- Use the dashboard to manage suppliers, parts, quotations, and purchase orders.
- Export reports as PDF from the relevant pages.
- **Export to CSV:** On the Suppliers and Parts pages, click the "Export to CSV" button to download the current list as a CSV file for use in Excel or Google Sheets.

## Customization
- **API URLs:** If you deploy the backend separately, update API URLs in the frontend (see `src/modules/*/services/*.js`).
- **Styling:** Modify Tailwind config or component CSS for custom branding.
- **Authentication:** Adjust roles and permissions in backend middleware as needed.

## License
This project is for educational/demo purposes. You may modify and use it as needed.