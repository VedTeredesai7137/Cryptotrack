import Link from 'next/link';
import { Github, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-emerald-400">CryptoTrack</h3>
            <p className="text-sm text-slate-400">
              Real-time cryptocurrency portfolio management with enterprise-grade security.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-slate-400 transition hover:text-emerald-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-400 transition hover:text-emerald-400">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-slate-400 transition hover:text-emerald-400">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition hover:text-emerald-400"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition hover:text-emerald-400"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:support@cryptotrack.com"
                className="text-slate-400 transition hover:text-emerald-400"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>© {currentYear} CryptoTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

