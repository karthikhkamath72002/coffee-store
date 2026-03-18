import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Upload } from 'lucide-react';
import {
  verifyAdminPassword,
  setAdminAuthenticated,
  clearAdminAuth,
  isAdminAuthenticated,
} from '../lib/adminAuth';
import { setProductsFromCsv } from '../lib/productStore';

export const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [csvMessage, setCsvMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const csv = String(reader.result ?? '');
        setProductsFromCsv(csv);
        setCsvMessage({ type: 'success', text: `Products updated (${file.name}). PLP and PDP will show the new data.` });
      } catch (err) {
        setCsvMessage({ type: 'error', text: err instanceof Error ? err.message : 'Invalid CSV.' });
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file, 'UTF-8');
  };

  if (authenticated) {
    return (
      <div className="min-h-screen w-full bg-[#fbf5ee] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#2A1A12]/10 shadow-lg p-8 text-center">
          <h1 className="text-2xl font-serif text-[#2A1A12] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Admin
          </h1>
          <p className="text-[#2A1A12] text-sm mb-6">You are signed in.</p>

          <div className="mb-6 text-left border-t border-[#2A1A12]/10 pt-6">
            <h2 className="text-sm font-medium text-[#2A1A12] mb-2">Products (PLP / PDP)</h2>
            <p className="text-xs text-[#2A1A12] mb-3">
              Upload a CSV with columns: <code className="bg-[#fbf5ee] text-[#2A1A12] px-1 rounded">id,name,blend,description,image,accentColor</code>. One product per row. Use the <strong>image</strong> column for a URL or path (e.g. <code className="bg-[#fbf5ee] text-[#2A1A12] px-1 rounded">/products/name.png</code>).
            </p>
            <a
              href="/products-template.csv"
              download
              className="text-xs text-[#8B4513] hover:underline mb-3 inline-block"
            >
              Download template CSV
            </a>
            <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-[#8B4513]/50 text-[#2A1A12] text-sm cursor-pointer hover:border-[#8B4513] hover:bg-[#fbf5ee]/50 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Choose CSV to upload</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="sr-only"
                onChange={handleCsvUpload}
                aria-label="Upload products CSV"
              />
            </label>
            {csvMessage && (
              <p
                className={`mt-2 text-xs ${csvMessage.type === 'success' ? 'text-green-700' : 'text-red-600'}`}
                role="alert"
              >
                {csvMessage.text}
              </p>
            )}
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
