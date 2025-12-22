import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const CRYPTO_OPTIONS = [
  { ticker: 'BTC', name: 'Bitcoin', id: 'bitcoin' },
  { ticker: 'ETH', name: 'Ethereum', id: 'ethereum' },
  { ticker: 'BNB', name: 'BNB', id: 'binancecoin' },
  { ticker: 'SOL', name: 'Solana', id: 'solana' },
  { ticker: 'ADA', name: 'Cardano', id: 'cardano' },
  { ticker: 'AVAX', name: 'Avalanche', id: 'avalanche-2' },
  { ticker: 'DOT', name: 'Polkadot', id: 'polkadot' },
];

const COINGECKO_IDS = CRYPTO_OPTIONS.map(crypto => crypto.id);
const TICKER_TO_ID = CRYPTO_OPTIONS.reduce((acc, crypto) => {
  acc[crypto.ticker] = crypto.id;
  return acc;
}, {});

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    ticker: '',
    name: '',
    targetPrice: '',
    quantity: '',
    buyPrice: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [livePrices, setLivePrices] = useState({});
  const [livePriceLoading, setLivePriceLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  const hasAssets = useMemo(() => assets.length > 0, [assets]);

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

    setToken(storedToken);
    setTokenChecked(true);

    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      setUserRole(payload.role || 'user');
      setCurrentUserId(payload.sub || '');
    } catch (err) {
      console.error('Failed to decode token:', err);
    }

    fetchAssets(storedToken);
  }, [router, isClient]);

  useEffect(() => {
    if (!isClient) return;
    fetchLivePrices();
  }, [isClient]);

  const fetchAssets = async (jwt) => {
    setLoading(true);
    setError('');

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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLivePrices = async () => {
    setLivePriceLoading(true);

    try {
      const url = `/api/prices?ids=${COINGECKO_IDS.join(',')}`;

      const response = await fetch(url);
      if (!response.ok) {
        console.warn('Unable to fetch live prices', response.status, response.statusText);
        return;
      }
      const data = await response.json();

      const formatted = {};
      CRYPTO_OPTIONS.forEach(crypto => {
        formatted[crypto.ticker] = data?.[crypto.id]?.usd ?? null;
      });

      setLivePrices(formatted);
    } catch (err) {
      console.error('Live price fetch failed:', err);
    } finally {
      setLivePriceLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Auto-fill name when ticker is selected
    if (name === 'ticker') {
      const selectedCrypto = CRYPTO_OPTIONS.find(crypto => crypto.ticker === value);
      setForm((prev) => ({
        ...prev,
        [name]: value,
        name: selectedCrypto ? selectedCrypto.name : prev.name
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddAsset = async (event) => {
    event.preventDefault();
    if (!token) return;

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ticker: form.ticker.trim().toUpperCase(),
        name: form.name.trim(),
        targetPrice: Number(form.targetPrice),
        quantity: Number(form.quantity),
        buyPrice: Number(form.buyPrice),
      };

      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add asset');
      }

      setForm({ ticker: '', name: '', targetPrice: '', quantity: '', buyPrice: '' });
      setAssets((prev) => [data.asset, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (assetId) => {
    if (!token) return;
    const confirmed = window.confirm('Delete this asset?');
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
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset._id);
    setForm({
      ticker: asset.ticker,
      name: asset.name,
      targetPrice: asset.targetPrice.toString(),
      quantity: asset.quantity.toString(),
      buyPrice: asset.buyPrice.toString(),
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!token || !editingAsset) return;

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ticker: form.ticker.trim().toUpperCase(),
        name: form.name.trim(),
        targetPrice: Number(form.targetPrice),
        quantity: Number(form.quantity),
        buyPrice: Number(form.buyPrice),
      };

      const response = await fetch(`/api/assets/${editingAsset}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update asset');
      }

      setForm({ ticker: '', name: '', targetPrice: '', quantity: '', buyPrice: '' });
      setEditingAsset(null);
      setAssets((prev) => prev.map((asset) =>
        asset._id === editingAsset ? data.asset : asset
      ));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingAsset(null);
    setForm({ ticker: '', name: '', targetPrice: '', quantity: '', buyPrice: '' });
  };

  const resolveLivePrice = (ticker) => {
    if (!ticker) return null;
    const key = ticker.toUpperCase();
    const mappedId = TICKER_TO_ID[key];
    if (!mappedId) return null;
    return livePrices[key] ?? null;
  };

  const formatCurrency = (value) =>
    typeof value === 'number' && !Number.isNaN(value)
      ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : '--';

  const isOwner = (asset) => {
    if (typeof asset.owner === 'string') {
      return asset.owner === currentUserId;
    }
    return asset.owner?.id === currentUserId;
  };

  const renderProfit = (asset) => {
    const livePrice = resolveLivePrice(asset.ticker);
    if (livePrice == null) {
      return <span className="text-slate-400">--</span>;
    }

    const profit = (livePrice - asset.buyPrice) * asset.quantity;
    const isPositive = profit >= 0;
    const profitClass = isPositive ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold';

    return <span className={profitClass}>{formatCurrency(profit)}</span>;
  };

  if (!isClient || !tokenChecked) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold text-emerald-400">Dashboard</h1>
        <form className="grid gap-4 md:grid-cols-5" onSubmit={editingAsset ? handleUpdate : handleAddAsset}>
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400" htmlFor="ticker">
              Ticker
            </label>
            <select
              id="ticker"
              name="ticker"
              value={form.ticker}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 focus:border-emerald-500"
              required
            >
              <option value="">Select Crypto</option>
              {CRYPTO_OPTIONS.map((crypto) => (
                <option key={crypto.ticker} value={crypto.ticker}>
                  {crypto.ticker} - {crypto.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 focus:border-emerald-500"
              placeholder="Bitcoin"
              required
            />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400" htmlFor="targetPrice">
              Target Price
            </label>
            <input
              id="targetPrice"
              name="targetPrice"
              type="number"
              min="0"
              step="0.01"
              value={form.targetPrice}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 focus:border-emerald-500"
              placeholder="50000"
              required
            />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="0.0001"
              value={form.quantity}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 focus:border-emerald-500"
              placeholder="0.5"
              required
            />
          </div>
          <div className="md:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-400" htmlFor="buyPrice">
              Buy Price
            </label>
            <input
              id="buyPrice"
              name="buyPrice"
              type="number"
              min="0"
              step="0.01"
              value={form.buyPrice}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 focus:border-emerald-500"
              placeholder="42000"
              required
            />
          </div>
          <div className="flex items-end gap-2 md:col-span-1">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {submitting ? (editingAsset ? 'Updating…' : 'Adding…') : (editingAsset ? 'Update Asset' : 'Add Asset')}
            </button>
            {editingAsset && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-md border border-slate-600 px-3 py-2 text-slate-300 transition hover:bg-slate-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-100">Watchlist</h2>
          {(loading || livePriceLoading) && <span className="text-sm text-slate-400">Loading…</span>}
        </div>

        {!loading && !hasAssets && <p className="text-slate-400">No assets yet. Add your first tracker!</p>}

        {hasAssets && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-sm">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-slate-300">Asset</th>
                  {userRole === 'admin' && (
                    <th className="px-4 py-2 text-left font-medium text-slate-300">Owner</th>
                  )}
                  <th className="px-4 py-2 text-left font-medium text-slate-300">Holdings</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-300">Buy Price</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-300">Live Price</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-300">Target Price</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-300">Profit / Loss</th>
                  <th className="px-4 py-2 text-right font-medium text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {assets.map((asset) => (
                  <tr key={asset._id}>
                    <td className="px-4 py-3 font-semibold text-emerald-300">{asset.ticker}</td>
                    {userRole === 'admin' && (
                      <td className="px-4 py-3 text-slate-200">
                        <div className="flex flex-col">
                          <span className="font-medium">{asset.owner?.username || 'Unknown'}</span>
                          <span className="text-xs text-slate-400">{asset.owner?.email || 'N/A'}</span>
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3 text-slate-200">{asset.quantity}</td>
                    <td className="px-4 py-3 text-slate-200">{formatCurrency(asset.buyPrice)}</td>
                    <td className="px-4 py-3 text-slate-200">
                      {formatCurrency(resolveLivePrice(asset.ticker))}
                    </td>
                    <td className="px-4 py-3 text-slate-200">{formatCurrency(asset.targetPrice)}</td>
                    <td className="px-4 py-3">{renderProfit(asset)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        {isOwner(asset) && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEdit(asset)}
                              className="rounded-md border border-emerald-500 px-3 py-1 text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(asset._id)}
                              className="rounded-md border border-red-500 px-3 py-1 text-red-300 transition hover:bg-red-500 hover:text-white"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        {!isOwner(asset) && userRole === 'admin' && (
                          <span className="px-3 py-1 text-xs text-slate-500 italic">View Only</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

