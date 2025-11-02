/**
 * SkeletonForm Component
 * 
 * Animated skeleton loader for form layouts
 * Shows loading state for create/edit forms
 */

import React from 'react';
import './Skeleton.css';

const SkeletonForm = ({ fields = 5 }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 animate-pulse">
      {/* Form Title */}
      <div className="skeleton-box h-8 w-1/3 mb-8 rounded"></div>

      {/* Form Fields */}
      <div className="space-y-6">
        {Array.from({ length: fields }).map((_, idx) => (
          <div key={`field-${idx}`}>
            {/* Label */}
            <div className="skeleton-box h-4 w-32 mb-2 rounded"></div>
            
            {/* Input */}
            {idx === fields - 1 && idx > 2 ? (
              // Last field as textarea
              <div className="skeleton-box h-24 w-full rounded"></div>
            ) : (
              // Regular input
              <div className="skeleton-box h-10 w-full rounded"></div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex gap-2">
        <div className="skeleton-box h-10 w-32 rounded"></div>
        <div className="skeleton-box h-10 w-24 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonForm;
