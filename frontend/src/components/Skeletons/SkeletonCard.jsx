/**
 * SkeletonCard Component
 * 
 * Animated skeleton loader for card-based layouts
 * Mimics the structure of SupplierCard, PartCard, etc.
 */

import React from 'react';
import './Skeleton.css';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Header with icon/badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="skeleton-box h-8 w-8 rounded-full"></div>
        <div className="skeleton-box h-6 w-20 rounded"></div>
      </div>

      {/* Title */}
      <div className="skeleton-box h-6 w-3/4 mb-3 rounded"></div>

      {/* Subtitle */}
      <div className="skeleton-box h-4 w-1/2 mb-4 rounded"></div>

      {/* Content lines */}
      <div className="space-y-2 mb-4">
        <div className="skeleton-box h-4 w-full rounded"></div>
        <div className="skeleton-box h-4 w-5/6 rounded"></div>
        <div className="skeleton-box h-4 w-4/6 rounded"></div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-4">
        <div className="skeleton-box h-9 w-20 rounded"></div>
        <div className="skeleton-box h-9 w-20 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
