import { Fragment, useMemo, useState } from 'react';
import type { QuoteRequest, QuoteStatus } from '@/lib/supabase';

const statuses: QuoteStatus[] = ['New', 'In Progress', 'Completed'];
const badge: Record<QuoteStatus, string> = {
  New: 'bg-accent-100 text-accent-800',
  'In Progress': 'bg-[oklch(0.95_0.05_85)] text-[oklch(0.45_0.11_70)]',
  Completed: 'bg-secondary-100 text-secondary-800',
};

interface Props { quotes: QuoteRequest[]; onStatus: (id: number, s: QuoteStatus) => void; savingId: number | null }

export default function QuoteTable({ quotes, onStatus, savingId }: Props) {
  const [filter, setFilter] = useState<'All' | QuoteStatus>('All');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState<number | null>(null);

  const rows = useMemo(() => quotes.filter((q) => (filter === 'All' || q.status === filter)
    && `${q.customer_name} ${q.email} ${q.package}`.toLowerCase().includes(search.toLowerCase())), [quotes, filter, search]);

  return (
    <div className="bg-background-50 rounded-xl border border-background-200">
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-background-200">
        <h2 className="font-bold text-primary-900">Customer Quote Requests (CRM)</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
            <input aria-label="Search quotes" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, package" className="w-full sm:w-64 border border-background-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500" />
          </div>
          <div className="flex flex-wrap bg-background-100 rounded-full px-1 py-1" role="tablist" aria-label="Filter by status">
            {(['All', ...statuses] as const).map((s) => (
              <button key={s} type="button" role="tab" aria-selected={filter === s} onClick={() => setFilter(s)} className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer ${filter === s ? 'bg-primary-700 text-background-50' : 'text-foreground-700'}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-background-100 text-foreground-700">
            <tr>{['ID', 'Date', 'Customer', 'Package', 'Property', 'Status', ''].map((h) => <th key={h} scope="col" className="text-left px-4 py-3 font-semibold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-foreground-500">No quote requests match this filter.</td></tr>}
            {rows.map((q) => (
              <Fragment key={q.id}>
                <tr className="border-t border-background-200 hover:bg-background-100/60">
                  <td className="px-4 py-3 text-foreground-500">#{q.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{new Date(q.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><p className="font-semibold text-primary-900">{q.customer_name}</p><p className="text-xs text-foreground-500">{q.email}</p></td>
                  <td className="px-4 py-3 font-semibold">{q.package}</td>
                  <td className="px-4 py-3">{q.property_type}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${badge[q.status]}`}>{q.status}</span>
                      <select aria-label={`Update status for ${q.customer_name}`} value={q.status} disabled={savingId === q.id} onChange={(e) => onStatus(q.id, e.target.value as QuoteStatus)} className="border border-background-300 rounded px-2 py-1 text-xs cursor-pointer">
                        {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => setOpen(open === q.id ? null : q.id)} aria-label="Toggle details" className="w-8 h-8 flex items-center justify-center rounded hover:bg-background-200 cursor-pointer"><i className={open === q.id ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} /></button>
                  </td>
                </tr>
                {open === q.id && (
                  <tr key={`${q.id}-d`} className="bg-background-100">
                    <td colSpan={7} className="px-4 py-4 text-sm">
                      <div className="flex flex-wrap gap-6">
                        <p><strong>Phone:</strong> <a href={`tel:${q.phone}`} className="text-primary-600 hover:underline">{q.phone}</a></p>
                        <p><strong>Email:</strong> <a href={`mailto:${q.email}`} className="text-primary-600 hover:underline">{q.email}</a></p>
                        <p><strong>Last updated:</strong> {new Date(q.updated_at).toLocaleString()}</p>
                      </div>
                      <p className="mt-2"><strong>Requirements:</strong> {q.requirements || 'None provided'}</p>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}