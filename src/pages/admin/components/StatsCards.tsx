import type { QuoteRequest } from '@/lib/supabase';

export default function StatsCards({ quotes }: { quotes: QuoteRequest[] }) {
  const count = (s: string) => quotes.filter((q) => q.status === s).length;
  const pkgCounts = ['Basic', 'Standard', 'Premium'].map((p) => ({ p, n: quotes.filter((q) => q.package === p).length }));
  const top = [...pkgCounts].sort((a, b) => b.n - a.n)[0];
  const completion = quotes.length ? Math.round((count('Completed') / quotes.length) * 100) : 0;

  const cards = [
    { label: 'Total Inquiries', value: quotes.length, icon: 'ri-inbox-archive-line', cls: 'bg-primary-100 text-primary-700' },
    { label: 'New', value: count('New'), icon: 'ri-notification-badge-line', cls: 'bg-accent-100 text-accent-700' },
    { label: 'In Progress', value: count('In Progress'), icon: 'ri-loader-2-line', cls: 'bg-[oklch(0.95_0.05_85)] text-[oklch(0.5_0.12_70)]' },
    { label: 'Completed', value: `${count('Completed')} (${completion}%)`, icon: 'ri-checkbox-circle-line', cls: 'bg-secondary-100 text-secondary-700' },
    { label: 'Most Popular Package', value: top && top.n > 0 ? `${top.p} (${top.n})` : '—', icon: 'ri-trophy-line', cls: 'bg-primary-800 text-accent-300' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-background-50 rounded-xl border border-background-200 p-5">
          <span className={`w-10 h-10 flex items-center justify-center rounded-lg mb-3 ${c.cls}`}><i className={`${c.icon} text-xl`} /></span>
          <p className="text-sm text-foreground-600">{c.label}</p>
          <p className="font-heading text-2xl font-bold text-primary-900">{c.value}</p>
        </div>
      ))}
    </div>
  );
}