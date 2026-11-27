import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { QuoteRequest } from '@/lib/supabase';

const prices: Record<string, number> = { Basic: 29.99, Standard: 49.99, Premium: 79.99 };

export default function PackageChart({ quotes }: { quotes: QuoteRequest[] }) {
  const data = Object.keys(prices).map((p) => ({ name: p, Requests: quotes.filter((q) => q.package === p).length }));
  const pipelineMrr = quotes.filter((q) => q.status !== 'Completed').reduce((s, q) => s + prices[q.package], 0);
  const wonMrr = quotes.filter((q) => q.status === 'Completed').reduce((s, q) => s + prices[q.package], 0);

  return (
    <div className="bg-background-50 rounded-xl border border-background-200 p-5">
      <h2 className="font-bold text-primary-900 mb-1">Package Popularity</h2>
      <p className="text-xs text-foreground-500 mb-4">Requests per package (live from database)</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--background-200))" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="Requests" fill="oklch(var(--accent-500))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
        <div className="bg-accent-50 rounded-lg p-3"><p className="text-foreground-600">Pipeline value / mo</p><p className="font-bold text-primary-900">${pipelineMrr.toFixed(2)}</p></div>
        <div className="bg-secondary-50 rounded-lg p-3"><p className="text-foreground-600">Won value / mo</p><p className="font-bold text-primary-900">${wonMrr.toFixed(2)}</p></div>
      </div>
    </div>
  );
}