// frontend/src/modules/supplier/pages/PurchaseOrderList.jsx

/**
 * PurchaseOrderList Page Component
 * Displays a grid of all purchase orders in the system
 * Fetches purchase order data on component mount and displays using PurchaseOrderCard components
 */

import React, { useEffect, useState } from "react";
import purchaseOrderService from "../services/purchaseOrderService";
import PurchaseOrderCard from "../components/PurchaseOrderCard";

/**
 * Purchase Order List Page
 * @returns {JSX.Element} Purchase order list page with grid layout
 */
const PurchaseOrderList = () => {
  // State to store the list of purchase orders
  const [orders, setOrders] = useState([]);

  /**
   * useEffect Hook - Runs on component mount
   * Fetches all purchase orders from the backend and updates state
   */
  useEffect(() => {
    // Call the getOrders API and set the returned data to state
    purchaseOrderService.getOrders().then(setOrders);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-4">Purchase Orders</h2>
      
      {/* Purchase Order Grid - Responsive: 1 column on mobile, 2 columns on medium+ screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Map through orders array and render a PurchaseOrderCard for each */}
        {orders.map((o) => (
          <PurchaseOrderCard key={o._id} order={o} />
        ))}
      </div>
    </div>
  );
};

export default PurchaseOrderList;
