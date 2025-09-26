// src/pages/Dashboard.jsx

/**
 * Dashboard Component
 * 
 * Main dashboard page for HeavySync application.
 * Features:
 * - Key metrics and statistics
 * - Quick action buttons
 * - Recent activity feed
 * - System overview cards
 * - Responsive grid layout
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSuppliers: 0,
    activePurchaseOrders: 0,
    pendingQuotations: 0,
    completedOrders: 0
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: 'purchase_order',
      title: 'New Purchase Order Created',
      description: 'PO-001 for construction materials',
      time: '2 hours ago',
      icon: '📋'
    },
    {
      id: 2,
      type: 'supplier',
      title: 'Supplier Added',
      description: 'ABC Construction Materials Ltd.',
      time: '5 hours ago',
      icon: '🏢'
    },
    {
      id: 3,
      type: 'quotation',
      title: 'Quotation Received',
      description: 'Quote for cement and steel bars',
      time: '1 day ago',
      icon: '💰'
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Completed',
      description: 'PO-002 delivery confirmed',
      time: '2 days ago',
      icon: '✅'
    }
  ]);

  /**
   * Simulated API call to fetch dashboard statistics
   */
  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll simulate the data
    const fetchStats = () => {
      setStats({
        totalSuppliers: 24,
        activePurchaseOrders: 12,
        pendingQuotations: 8,
        completedOrders: 156
      });
    };

    fetchStats();
  }, []);

  /**
   * Statistics cards configuration
   */
  const statsCards = [
    {
      title: 'Total Suppliers',
      value: stats.totalSuppliers,
      icon: '🏢',
      color: 'blue',
      link: '/suppliers'
    },
    {
      title: 'Active Purchase Orders',
      value: stats.activePurchaseOrders,
      icon: '📋',
      color: 'green',
      link: '/purchase-orders'
    },
    {
      title: 'Pending Quotations',
      value: stats.pendingQuotations,
      icon: '⏰',
      color: 'yellow',
      link: '/purchase-orders'
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      icon: '✅',
      color: 'purple',
      link: '/purchase-orders'
    }
  ];

  /**
   * Quick action buttons configuration
   */
  const quickActions = [
    {
      title: 'Add New Supplier',
      description: 'Register a new supplier in the system',
      icon: '➕',
      link: '/suppliers/new',
      color: 'blue'
    },
    {
      title: 'Create Purchase Order',
      description: 'Start a new purchase order process',
      icon: '📝',
      link: '/purchase-orders/new',
      color: 'green'
    },
    {
      title: 'View All Suppliers',
      description: 'Browse and manage suppliers',
      icon: '👥',
      link: '/suppliers',
      color: 'gray'
    }
  ];

  /**
   * Gets color classes for statistics cards
   */
  const getCardColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome to HeavySync Purchase Management System
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                📊 Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statsCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`relative bg-white p-6 rounded-lg shadow-sm border-2 hover:shadow-md transition-shadow duration-200 ${getCardColorClasses(card.color)}`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl">{card.icon}</span>
                </div>
                <div className="ml-4 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-semibold">{card.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.link}
                      className="relative group bg-white p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <span className="text-xl">{action.icon}</span>
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                            {action.title}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="ml-3 min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-200">
                <Link
                  to="/activities"
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  View all activities →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8">
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">System Status</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">API Status</p>
                    <p className="text-sm text-gray-500">All systems operational</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Database</p>
                    <p className="text-sm text-gray-500">Connected</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Backup</p>
                    <p className="text-sm text-gray-500">Last: 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;