import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, KeyIcon } from '@heroicons/react/24/outline';

function NavItem({ to, icon: Icon, children, isActive, onClick }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-gray-700 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 mr-3" />
      {children}
    </Link>
  );
}

function Sidebar({ onClose }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="w-64 h-screen bg-gray-800 flex flex-col">
      {/* Logo and Brand */}
      <div className="px-4 py-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <ShieldIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="ml-3 text-xl font-bold text-white">VRV Security</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavItem 
          to="/" 
          icon={HomeIcon} 
          isActive={isActive('/')}
          onClick={handleLinkClick}
        >
          Dashboard
        </NavItem>
        <NavItem 
          to="/users" 
          icon={UserGroupIcon} 
          isActive={isActive('/users')}
          onClick={handleLinkClick}
        >
          Users
        </NavItem>
        <NavItem 
          to="/roles" 
          icon={KeyIcon} 
          isActive={isActive('/roles')}
          onClick={handleLinkClick}
        >
          Roles
        </NavItem>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://ui-avatars.com/api/?name=Admin+User"
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@vrv.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon({ className }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" 
      />
    </svg>
  );
}

export default Sidebar;