import { useState } from 'react';

function Roles() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      permissions: ['read', 'write', 'delete'],
      description: 'Full system access'
    },
    {
      id: 2,
      name: 'User',
      permissions: ['read'],
      description: 'Basic access rights'
    },
    {
      id: 3,
      name: 'Editor',
      permissions: ['read', 'write'],
      description: 'Content management access'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
    description: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [permissionFilter, setPermissionFilter] = useState('all');

  const handleEdit = (role) => {
    setEditingRole(role);
    setFormData(role);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || formData.permissions.length === 0) {
      alert('Please fill in all required fields and select at least one permission');
      return;
    }

    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id ? { ...formData, id: role.id } : role
      ));
    } else {
      setRoles([...roles, { ...formData, id: roles.length + 1 }]);
    }
    setShowModal(false);
    setEditingRole(null);
    setFormData({ name: '', permissions: [], description: '' });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRoles = [...roles].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key].toLowerCase();
    const bValue = b[sortConfig.key].toLowerCase();
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredRoles = sortedRoles.filter(role => {
    const matchesSearch = 
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.permissions.some(permission => 
        permission.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesPermission = permissionFilter === 'all' || 
      role.permissions.includes(permissionFilter);
    
    return matchesSearch && matchesPermission;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Roles Management</h1>
        <button
          onClick={() => {
            setEditingRole(null);
            setFormData({ name: '', permissions: [], description: '' });
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Add Role
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search roles..."
          className="w-full md:w-64 p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="w-full md:w-40 p-2 border rounded-lg"
          value={permissionFilter}
          onChange={(e) => setPermissionFilter(e.target.value)}
        >
          <option value="all">All Permissions</option>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="delete">Delete</option>
        </select>

        <button
          onClick={() => handleSort('name')}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Sort by Name {getSortIcon('name')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white p-4 md:p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <h2 className="text-xl font-semibold">{role.name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(role)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{role.description}</p>
            <div className="space-y-2">
              <h3 className="font-medium">Permissions:</h3>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingRole ? 'Edit Role' : 'Add New Role'}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Role Name"
                className="w-full mb-3 p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full mb-3 p-2 border rounded"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <div className="mb-3">
                <label className="block mb-2">Permissions:</label>
                <div className="space-y-2">
                  {['read', 'write', 'delete'].map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              permissions: [...formData.permissions, permission]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              permissions: formData.permissions.filter((p) => p !== permission)
                            });
                          }
                        }}
                        className="mr-2"
                      />
                      {permission}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRole(null);
                    setFormData({ name: '', permissions: [], description: '' });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingRole ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;