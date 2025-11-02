/**
 * SkeletonDashboard Component
 * 
 * Animated skeleton loader for dashboard layout
 * Shows stat cards and charts loading state
 */

import React from 'react';
import './Skeleton.css';

const SkeletonStatCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton-box h-4 w-24 rounded"></div>
        <div className="skeleton-box h-8 w-8 rounded-full"></div>
      </div>
      <div className="skeleton-box h-8 w-20 mb-2 rounded"></div>
      <div className="skeleton-box h-3 w-32 rounded"></div>
    </div>
  );
};

const SkeletonChart = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="skeleton-box h-6 w-40 mb-4 rounded"></div>
      <div className="h-64 flex items-end justify-between gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div 
            key={`bar-${idx}`} 
            className="skeleton-box w-full rounded-t"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

const SkeletonDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonStatCard key={`stat-${idx}`} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="skeleton-box h-6 w-40 mb-4 rounded"></div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={`activity-${idx}`} className="flex gap-3">
              <div className="skeleton-box h-10 w-10 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="skeleton-box h-4 w-3/4 mb-2 rounded"></div>
                <div className="skeleton-box h-3 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboard;
