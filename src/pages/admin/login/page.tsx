import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import { supabase } from '@/lib/supabase';
import useAuth from '@/hooks/useAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (session) navigate('/admin', { replace: true }); }, [session, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) setError('Invalid credentials. Access is restricted to WHSS staff.');
    else navigate('/admin', { replace: true });
  };

  const input = 'w-full box-border border border-background-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500';
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center bg-background-100 px-4 py-16">
        <form onSubmit={onSubmit} className="w-full max-w-md bg-background-50 rounded-2xl shadow-lg border border-background-200 p-8 space-y-5">
          <div className="text-center">
            <span className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-primary-800 text-accent-300 mb-3"><i className="ri-lock-2-line text-2xl" /></span>
            <h1 className="text-2xl font-bold text-primary-900">Staff Sign In</h1>
            <p className="text-sm text-foreground-600 mt-1">Authorized WHSS staff only</p>
          </div>
          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold mb-1">Email</label>
            <input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold mb-1">Password</label>
            <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
          </div>
          {error && <p role="alert" className="text-sm text-[oklch(0.45_0.18_25)]">{error}</p>}
          <button type="submit" disabled={busy} className="w-full py-3 rounded-md bg-primary-700 text-background-50 font-bold whitespace-nowrap hover:bg-primary-800 disabled:opacity-60 cursor-pointer">{busy ? 'Signing in...' : 'Sign In'}</button>
        </form>
      </section>
    </Layout>
  );
}