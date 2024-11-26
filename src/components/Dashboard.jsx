import { UsersIcon, KeyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function DashboardCard({ title, value, icon: Icon, color, percentage }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{value}</h3>
          <p className={`text-sm ${percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentage >= 0 ? '↑' : '↓'} {Math.abs(percentage)}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function ActivityLog({ date, action, user, type }) {
  const getTypeStyles = () => {
    switch (type) {
      case 'create': return 'bg-green-100 text-green-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'update': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center py-3">
      <div className="w-24 text-sm text-gray-500">{date}</div>
      <div className={`px-2 py-1 rounded text-xs font-medium ${getTypeStyles()} mx-4 w-16 text-center`}>
        {type}
      </div>
      <div className="flex-1">
        <span className="font-medium">{user}</span> {action}
      </div>
    </div>
  );
}

function Dashboard() {
  const [timeRange, setTimeRange] = useState('week');

  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      icon: UsersIcon,
      color: 'bg-blue-500',
      percentage: 12.5
    },
    {
      title: 'Active Roles',
      value: '8',
      icon: KeyIcon,
      color: 'bg-green-500',
      percentage: 5.2
    },
    {
      title: 'Security Events',
      value: '147',
      icon: ShieldCheckIcon,
      color: 'bg-purple-500',
      percentage: -2.4
    }
  ];

  const activities = [
    { date: '2024-03-20', type: 'create', user: 'John Doe', action: 'created a new role "Developer"' },
    { date: '2024-03-19', type: 'update', user: 'Jane Smith', action: 'modified permissions for "Admin" role' },
    { date: '2024-03-19', type: 'delete', user: 'Mike Johnson', action: 'removed user "Alex Wilson"' },
    { date: '2024-03-18', type: 'create', user: 'Sarah Lee', action: 'added new user "Emma Davis"' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Frontend Developer Assignment </h1>
          <p className="text-gray-600 mt-1">Monitor your system's key metrics and recent activities</p>
        </div>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <ActivityLog key={index} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;