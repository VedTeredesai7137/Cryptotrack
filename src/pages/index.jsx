import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Shield, TrendingUp, Zap, BarChart3 } from 'lucide-react';

const COINGECKO_IDS = ['bitcoin', 'ethereum', 'solana'];
const COINGECKO_API_KEY =
  process.env.NEXT_PUBLIC_CRPYTOGETO || process.env.CrpytoGeto || undefined;

function LiveMarketStrip() {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        let url = `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS.join(
          ','
        )}&vs_currencies=usd&include_24hr_change=true`;

        if (COINGECKO_API_KEY) {
          const apiKeyParam = COINGECKO_API_KEY.startsWith('CG-')
            ? `x_cg_demo_api_key=${COINGECKO_API_KEY}`
            : `x_cg_pro_api_key=${COINGECKO_API_KEY}`;
          url += `&${apiKeyParam}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }

        const data = await response.json();
        setPrices(data);
        setError(false);
      } catch (err) {
        console.error('Price fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const coins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="grid gap-4 md:grid-cols-3">
        {coins.map((coin) => {
          const priceData = prices[coin.id];
          const price = priceData?.usd;
          const change24h = priceData?.usd_24h_change;

          return (
            <div
              key={coin.id}
              className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 backdrop-blur"
            >
              {loading ? (
                <div className="space-y-3">
                  <div className="h-5 w-20 animate-pulse rounded bg-slate-700"></div>
                  <div className="h-8 w-32 animate-pulse rounded bg-slate-700"></div>
                  <div className="h-4 w-16 animate-pulse rounded bg-slate-700"></div>
                </div>
              ) : error || !price ? (
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-300">{coin.name}</h3>
                  <p className="text-2xl font-bold text-slate-400">N/A</p>
                  <p className="text-sm text-slate-500">Price unavailable</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-300">{coin.name}</h3>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  {change24h !== undefined && (
                    <p
                      className={`text-sm font-medium ${change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}
                    >
                      {change24h >= 0 ? '+' : ''}
                      {change24h.toFixed(2)}% (24h)
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 text-center">
      <h1 className="mb-6 text-6xl font-bold tracking-tight text-emerald-400 md:text-7xl lg:text-8xl">
       CryptoTrack
      </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-300 md:text-2xl">
          Real-time portfolio management with RBAC security
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-lg bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-600"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-slate-700 bg-slate-800 px-8 py-3 text-lg font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Live Market Strip */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
          <h2 className="mb-4 text-center text-2xl font-semibold text-slate-200">
            Live Market Prices
          </h2>
          <LiveMarketStrip />
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-slate-100">
          Why Choose CryptoTrack?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Shield className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-200">RBAC Security</h3>
            <p className="text-slate-400">
              Role-based access control ensures your data is protected with enterprise-grade security.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <TrendingUp className="h-12 w-12 text-emerald-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-200">Real-Time Tracking</h3>
            <p className="text-slate-400">
              Monitor your portfolio with live price updates from CoinGecko API.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <Zap className="h-12 w-12 text-yellow-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-200">Lightning Fast</h3>
            <p className="text-slate-400">
              Built with Next.js for optimal performance and instant updates.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-6 text-center">
            <div className="mb-4 flex justify-center">
              <BarChart3 className="h-12 w-12 text-purple-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-200">Portfolio Analytics</h3>
            <p className="text-slate-400">
              Track profit/loss and analyze your investments with detailed insights.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20">
        <div className="rounded-lg border border-slate-800 bg-gradient-to-r from-slate-900/70 to-slate-800/70 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-100">
            Ready to Start Tracking?
          </h2>
          <p className="mb-8 text-lg text-slate-300">
            Join thousands of users managing their crypto portfolios with CryptoTrack.
          </p>
          <Link
            href="/register"
            className="inline-block rounded-lg bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-600"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

