import type { QuoteRequest } from '@/lib/supabase';

export default function MisInsights({ quotes }: { quotes: QuoteRequest[] }) {
  const newCount = quotes.filter((q) => q.status === 'New').length;
  const counts = ['Basic', 'Standard', 'Premium'].map((p) => ({ p, n: quotes.filter((q) => q.package === p).length })).sort((a, b) => b.n - a.n);
  const propMap = quotes.reduce<Record<string, number>>((m, q) => ({ ...m, [q.property_type]: (m[q.property_type] || 0) + 1 }), {});
  const topProp = Object.entries(propMap).sort((a, b) => b[1] - a[1])[0];

  const recs = [
    newCount > 0 ? `${newCount} new inquiries are awaiting first contact — assign advisors today to keep response time under 24 hours.` : 'All inquiries have been contacted. Great response performance.',
    counts[0]?.n ? `${counts[0].p} is the most requested package — ensure enough equipment inventory and promote it in marketing.` : 'Not enough data yet for package recommendations.',
    topProp ? `${topProp[0]} is the most common property type (${topProp[1]}) — tailor installation templates and ads to this segment.` : '',
  ].filter(Boolean);

  const concepts = [
    ['Data Collection', 'Quote form captures structured customer data.'],
    ['Data Storage', 'Central cloud database (quote_requests table).'],
    ['Information Processing', 'Counts, percentages and value totals computed live.'],
    ['CRM', 'Customer history, contact details and notes in one view.'],
    ['Business Workflow', 'Status pipeline: New → In Progress → Completed.'],
    ['Decision Support', 'KPIs, charts and auto-recommendations below.'],
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-primary-900 text-background-50 rounded-xl p-5">
        <h2 className="font-bold mb-3 flex items-center gap-2"><i className="ri-lightbulb-flash-line text-accent-300" />Decision Support Recommendations</h2>
        <ul className="space-y-3 text-sm">
          {recs.map((r) => <li key={r} className="flex gap-2"><i className="ri-arrow-right-circle-line text-accent-300 mt-0.5" />{r}</li>)}
        </ul>
      </div>
      <div className="bg-background-50 rounded-xl border border-background-200 p-5">
        <h2 className="font-bold text-primary-900 mb-3">MIS Concepts Demonstrated</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {concepts.map(([t, d]) => (
            <div key={t} className="bg-background-100 rounded-lg p-3"><dt className="font-semibold text-primary-800">{t}</dt><dd className="text-foreground-600">{d}</dd></div>
          ))}
        </dl>
      </div>
    </div>
  );
}