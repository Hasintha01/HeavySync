/**
 * SkeletonList Component
 * 
 * Animated skeleton loader for list views
 * Displays multiple skeleton items in a list format
 */

import React from 'react';
import './Skeleton.css';

const SkeletonListItem = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 animate-pulse">
      <div className="flex items-center gap-4">
        {/* Icon/Avatar */}
        <div className="skeleton-box h-12 w-12 rounded-full flex-shrink-0"></div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="skeleton-box h-5 w-2/3 mb-2 rounded"></div>
          <div className="skeleton-box h-4 w-1/2 rounded"></div>
        </div>
        
        {/* Action */}
        <div className="skeleton-box h-8 w-8 rounded"></div>
      </div>
    </div>
  );
};

const SkeletonList = ({ items = 5 }) => {
  return (
    <div>
      {Array.from({ length: items }).map((_, idx) => (
        <SkeletonListItem key={`list-item-${idx}`} />
      ))}
    </div>
  );
};

export default SkeletonList;
