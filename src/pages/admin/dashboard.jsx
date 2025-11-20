import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'assets'
  const [users, setUsers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      setTokenChecked(true);
      router.replace('/login');
      return;
    }

    // Decode JWT to check role
    try {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      if (payload.role !== 'admin') {
        setTokenChecked(true);
        router.replace('/dashboard');
        return;
      }
      setUserRole(payload.role);
      setToken(storedToken);
      setTokenChecked(true);
      fetchUsers(storedToken);
      fetchAssets(storedToken);
    } catch (err) {
      console.error('Token decode error:', err);
      setTokenChecked(true);
      router.replace('/login');
    }
  }, [router, isClient]);

  const fetchUsers = async (jwt) => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch users');
      }
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssets = async (jwt) => {
    try {
      const response = await fetch('/api/assets', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch assets');
      }
      setAssets(data.assets || []);
    } catch (err) {
      if (!error) setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!token) return;
    const confirmed = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    if (!token) return;
    const action = newRole === 'admin' ? 'promote to admin' : 'demote to user';
    const confirmed = window.confirm(`Are you sure you want to ${action} this user?`);
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user role');
      }

      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
      );
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (!token) return;
    const confirmed = window.confirm('Are you sure you want to delete this asset?');
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/assets/${assetId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete asset');
      }

      setAssets((prev) => prev.filter((asset) => asset._id !== assetId));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const formatCurrency = (value) =>
    typeof value === 'number' && !Number.isNaN(value)
      ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '--';

  if (!isClient || !tokenChecked) {
    return null;
  }

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-emerald-400">Admin Dashboard</h1>
        <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
          Admin Panel
        </span>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800">
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'users'
              ? 'border-b-2 border-emerald-400 text-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          User Management
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('assets')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'assets'
              ? 'border-b-2 border-emerald-400 text-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Global Asset Oversight
        </button>
      </div>

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">User Management</h2>
            {loading && <span className="text-sm text-slate-400">Loading…</span>}
          </div>

          {!loading && users.length === 0 && (
            <p className="text-slate-400">No users found.</p>
          )}

          {users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800 text-sm">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Username</th>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Email</th>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Role</th>
                    <th className="px-4 py-2 text-right font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-3 font-semibold text-slate-200">{user.username}</td>
                      <td className="px-4 py-3 text-slate-200">{user.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            user.role === 'admin'
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {user.role === 'user' ? (
                            <button
                              type="button"
                              onClick={() => handleUpdateRole(user.id, 'admin')}
                              className="rounded-md border border-emerald-500 px-3 py-1 text-xs text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                            >
                              Make Admin
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUpdateRole(user.id, 'user')}
                              className="rounded-md border border-yellow-500 px-3 py-1 text-xs text-yellow-300 transition hover:bg-yellow-500 hover:text-white"
                            >
                              Demote
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id)}
                            className="rounded-md border border-red-500 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Global Asset Oversight Tab */}
      {activeTab === 'assets' && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-100">Global Asset Oversight</h2>
            {loading && <span className="text-sm text-slate-400">Loading…</span>}
          </div>

          {!loading && assets.length === 0 && (
            <p className="text-slate-400">No assets found.</p>
          )}

          {assets.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800 text-sm">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Asset</th>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Name</th>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Owner</th>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Target Price</th>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Quantity</th>
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Buy Price</th>
                    <th className="px-4 py-2 text-right font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {assets.map((asset) => (
                    <tr key={asset._id}>
                      <td className="px-4 py-3 font-semibold text-emerald-300">{asset.ticker}</td>
                      <td className="px-4 py-3 text-slate-200">{asset.name}</td>
                      <td className="px-4 py-3 text-slate-200">
                        {asset.owner?.username ? (
                          <div>
                            <div className="font-medium">{asset.owner.username}</div>
                            {asset.owner.email && (
                              <div className="text-xs text-slate-400">{asset.owner.email}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">
                            {asset.owner?.id || 'Unknown'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-200">
                        {formatCurrency(asset.targetPrice)}
                      </td>
                      <td className="px-4 py-3 text-slate-200">{asset.quantity}</td>
                      <td className="px-4 py-3 text-slate-200">{formatCurrency(asset.buyPrice)}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteAsset(asset._id)}
                          className="rounded-md border border-red-500 px-3 py-1 text-xs text-red-300 transition hover:bg-red-500 hover:text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

