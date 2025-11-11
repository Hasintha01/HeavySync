// frontend/src/modules/supplier/components/PartCard.jsx

/**
 * PartCard Component
 * Displays individual part information in a card layout
 * Shows stock status with color coding
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { FiEdit } from "react-icons/fi"; // Feather Icons - Edit

/**
 * Part Card Component
 * @param {Object} props - Component props
 * @param {Object} props.part - Part object containing part details
 */
const PartCard = ({ part }) => {
  const navigate = useNavigate();
  
  // Determine if stock is low
  const isLowStock = part.quantity <= part.minimumStock;
  
  const handleEdit = () => {
    navigate(`/parts/edit/${part._id}`);
  };
  
  return (
    <div className={`card cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isLowStock ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}`}>
      {/* Part Name - Main heading */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">{part.name}</h3>
        {isLowStock && (
          <StatusBadge status="low-stock" />
        )}
      </div>
      
      {/* Part ID and Number */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <p className="text-sm">
          <strong className="text-gray-800 dark:text-gray-200">Part ID:</strong> <span className="text-gray-700 dark:text-gray-300">{part.partId}</span>
        </p>
        <p className="text-sm">
          <strong className="text-gray-800 dark:text-gray-200">Part #:</strong> <span className="text-gray-700 dark:text-gray-300">{part.partNumber}</span>
        </p>
      </div>
      
      {/* Description */}
      <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
        {part.description}
      </p>
      
      {/* Stock Information */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <p className="text-sm">
          <strong className="text-gray-800 dark:text-gray-200">Quantity:</strong> <span className="text-gray-700 dark:text-gray-300">{part.quantity}</span>
        </p>
        <p className="text-sm">
          <strong className="text-gray-800 dark:text-gray-200">Min Stock:</strong> <span className="text-gray-700 dark:text-gray-300">{part.minimumStock}</span>
        </p>
      </div>
      
      {/* Price and Location */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <p className="text-sm">
          <strong className="text-gray-800 dark:text-gray-200">Unit Price:</strong> <span className="text-gray-700 dark:text-gray-300">LKR {part.unitPrice?.toFixed(2)}</span>
        </p>
        <p className="text-sm">
          <strong className="text-gray-800 dark:text-gray-200">Location:</strong> <span className="text-gray-700 dark:text-gray-300">{part.location}</span>
        </p>
      </div>
      
      {/* Category */}
      <p className="mb-2 text-sm">
        <strong className="text-gray-800 dark:text-gray-200">Category:</strong> <span className="text-gray-700 dark:text-gray-300">{part.categoryId}</span>
      </p>
      
      {/* Report ID - Only show if exists */}
      {part.reportId && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong className="text-gray-800 dark:text-gray-200">Report ID:</strong> <span className="text-gray-700 dark:text-gray-300">{part.reportId}</span>
        </p>
      )}
      
      {/* Edit Button */}
      <div className="mt-4">
        <button 
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors w-full justify-center"
        >
          <FiEdit className="w-4 h-4" />
          Edit Part
        </button>
      </div>
    </div>
  );
};

export default PartCard;
