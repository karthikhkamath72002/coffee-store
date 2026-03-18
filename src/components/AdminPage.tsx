import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  verifyAdminPassword,
  setAdminAuthenticated,
  clearAdminAuth,
  isAdminAuthenticated,
} from '../lib/adminAuth';
import { AdminProductEditor } from './AdminProductEditor';

export const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = await verifyAdminPassword(password);
      if (ok) {
        setAdminAuthenticated();
        setAuthenticated(true);
        setPassword('');
      } else {
        setError('Incorrect password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    setAuthenticated(false);
  };

  if (authenticated) {
    return (
      <div className="min-h-screen w-full bg-[#fbf5ee] flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full bg-white rounded-2xl border border-[#2A1A12]/10 shadow-lg p-8 text-left max-h-[90vh] overflow-y-auto">
          <h1 className="text-2xl font-serif text-[#2A1A12] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Admin
          </h1>
          <p className="text-[#2A1A12] text-sm mb-6">You are signed in.</p>

          <div className="w-full mt-4">
            <AdminProductEditor onLogout={handleLogout} embedded={true} showSignOut={false} />
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-5 py-2.5 bg-[#2A1A12] text-[#fbf5ee] rounded-full text-sm font-medium hover:bg-[#3d2818] transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#fbf5ee] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#2A1A12]/10 shadow-lg p-8">
        <h1 className="text-2xl font-serif text-[#2A1A12] mb-1 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Admin
        </h1>
        <p className="text-[#5D3A1A]/70 text-sm text-center mb-6">Enter password to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="admin-password" className="sr-only">
              Password
            </label>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#2A1A12] border border-[#2A1A12] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/60 focus:border-[#8B4513]"
              autoComplete="current-password"
              autoFocus
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/70 hover:text-white transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={2} /> : <Eye className="w-5 h-5" strokeWidth={2} />}
            </button>
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-3 bg-[#2A1A12] text-[#fbf5ee] rounded-xl text-sm font-medium hover:bg-[#3d2818] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};
