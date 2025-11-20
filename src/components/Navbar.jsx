import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    setHasToken(Boolean(token));


    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload.role === 'admin');
      } catch (err) {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [router.asPath]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setHasToken(false);
    router.push('/login');
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-emerald-400">
          CryptoTrack
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors hover:text-emerald-300 ${
                router.pathname === href ? 'text-emerald-400' : 'text-slate-200'
              }`}
            >
              {label}
            </Link>
          ))}
          {hasToken && isAdmin && (
            <Link
              href="/admin/dashboard"
              className={`rounded-md border border-purple-500 px-3 py-1 text-xs font-semibold transition hover:bg-purple-500 hover:text-white ${
                router.pathname === '/admin/dashboard'
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'border-purple-500 text-purple-300'
              }`}
            >
              Admin Panel
            </Link>
          )}
          {hasToken && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-emerald-500 px-3 py-1 text-emerald-300 transition hover:bg-emerald-500 hover:text-slate-950"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

