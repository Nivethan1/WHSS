import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import { supabase, type QuoteRequest, type QuoteStatus } from '@/lib/supabase';
import useAuth from '@/hooks/useAuth';
import StatsCards from './components/StatsCards';
import PackageChart from './components/PackageChart';
import QuoteTable from './components/QuoteTable';
import MisInsights from './components/MisInsights';

export default function AdminDashboard() {
  const { session, loading: authLoading } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: err } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });
      if (err) throw err;
      setQuotes((data ?? []) as QuoteRequest[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (session) load(); }, [session, load]);

  const updateStatus = async (id: number, status: QuoteStatus) => {
    setSavingId(id);
    const updated_at = new Date().toISOString();
    const { error: err } = await supabase.from('quote_requests').update({ status, updated_at }).eq('id', id);
    if (err) setError(err.message);
    else setQuotes((qs) => qs.map((q) => (q.id === id ? { ...q, status, updated_at } : q)));
    setSavingId(null);
  };

  if (authLoading) return <Layout><p className="p-16 text-center">Checking access...</p></Layout>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <Layout>
      <div className="bg-background-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-accent-700 font-semibold text-sm uppercase tracking-wider">Operations</p>
              <h1 className="text-2xl md:text-3xl font-bold text-primary-900">WHSS Operations Dashboard</h1>
              <p className="text-sm text-foreground-600">Signed in as {session.user.email}</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={load} className="px-4 py-2 rounded-md border border-primary-300 text-primary-700 font-semibold text-sm whitespace-nowrap hover:bg-background-50 cursor-pointer"><i className="ri-refresh-line mr-1" />Refresh</button>
              <button type="button" onClick={() => supabase.auth.signOut()} className="px-4 py-2 rounded-md bg-primary-700 text-background-50 font-semibold text-sm whitespace-nowrap hover:bg-primary-800 cursor-pointer"><i className="ri-logout-box-r-line mr-1" />Sign Out</button>
            </div>
          </div>

          {error && (
            <div role="alert" className="flex flex-col sm:flex-row justify-between gap-3 bg-[oklch(0.96_0.03_25)] text-[oklch(0.45_0.18_25)] rounded-lg px-4 py-3 text-sm">
              <span>{error}</span>
              <button type="button" onClick={load} className="font-bold underline whitespace-nowrap cursor-pointer">Retry</button>
            </div>
          )}

          {loading ? <p className="text-center py-16 text-foreground-600">Loading quote requests...</p> : (
            <>
              <StatsCards quotes={quotes} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1"><PackageChart quotes={quotes} /></div>
                <div className="lg:col-span-2"><MisInsights quotes={quotes} /></div>
              </div>
              <QuoteTable quotes={quotes} onStatus={updateStatus} savingId={savingId} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}