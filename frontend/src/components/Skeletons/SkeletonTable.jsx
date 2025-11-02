/**
 * SkeletonTable Component
 * 
 * Animated skeleton loader for table layouts
 * Used in list views with tabular data
 */

import React from 'react';
import './Skeleton.css';

const SkeletonTable = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, idx) => (
            <div key={`header-${idx}`} className="skeleton-box h-4 w-3/4 rounded"></div>
          ))}
        </div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={`row-${rowIdx}`} className="p-4 animate-pulse">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <div 
                  key={`cell-${rowIdx}-${colIdx}`} 
                  className="skeleton-box h-4 rounded"
                  style={{ width: `${Math.random() * 30 + 60}%` }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonTable;
