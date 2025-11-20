import { useRouter } from 'next/router';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to register');
      }

      setSuccess('Account created! Redirecting to login…');
      setTimeout(() => router.push('/login'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-lg border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-semibold text-emerald-400">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm text-slate-300" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none transition focus:border-emerald-500"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-emerald-400">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {loading ? 'Creating account…' : 'Register'}
        </button>
      </form>
    </section>
  );
}

