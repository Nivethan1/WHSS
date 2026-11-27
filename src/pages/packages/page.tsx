import { useNavigate } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import PageHeader from '@/components/base/PageHeader';
import { packages, comparisonRows } from '@/mocks/siteContent';

export default function Packages() {
  const navigate = useNavigate();
  const select = (name: string) => navigate(`/quote?package=${name}`);

  return (
    <Layout>
      <PageHeader eyebrow="Security Packages" title="Choose the right level of protection" text="Three simple monthly plans. Select a package to carry it straight into your free quote request." />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <p className="mb-8 text-sm bg-accent-50 border border-accent-200 text-accent-900 rounded-lg px-4 py-3"><i className="ri-information-line mr-1" />Example pricing for a fictional company (university MIS project). Not a real offer.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((p) => (
            <div key={p.name} className={`relative rounded-2xl p-6 md:p-8 flex flex-col border ${p.highlight ? 'bg-primary-900 text-background-50 border-primary-900 shadow-2xl md:-translate-y-3' : 'bg-background-50 border-background-200'}`}>
              {p.highlight && <span className="absolute -top-3 left-6 bg-accent-500 text-primary-950 text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>}
              <h2 className={`text-2xl font-bold ${p.highlight ? '' : 'text-primary-900'}`}>{p.name}</h2>
              <p className={`text-sm mt-1 mb-5 ${p.highlight ? 'text-foreground-200' : 'text-foreground-600'}`}>{p.tagline}</p>
              <p className="font-heading mb-6"><span className="text-4xl font-extrabold">${p.price}</span><span className="text-sm opacity-80">/month</span></p>
              <ul className="space-y-2 mb-8 flex-1">
                {p.features.map((f) => <li key={f} className="flex gap-2 text-sm"><i className={`ri-check-line ${p.highlight ? 'text-accent-300' : 'text-secondary-600'}`} />{f}</li>)}
              </ul>
              <button type="button" onClick={() => select(p.name)} className={`w-full py-3 rounded-md font-bold whitespace-nowrap cursor-pointer ${p.highlight ? 'bg-accent-500 text-primary-950 hover:bg-accent-400' : 'bg-primary-700 text-background-50 hover:bg-primary-800'}`}>Select {p.name} Package</button>
            </div>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mt-16 mb-6">Compare packages</h2>
        <div className="overflow-x-auto rounded-xl border border-background-200">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Comparison of WHSS security packages</caption>
            <thead className="bg-primary-800 text-background-50">
              <tr>
                <th scope="col" className="text-left p-4">Feature</th>
                {packages.map((p) => <th key={p.name} scope="col" className="p-4">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((r, i) => (
                <tr key={r.label} className={i % 2 ? 'bg-background-100' : 'bg-background-50'}>
                  <th scope="row" className="text-left p-4 font-semibold text-foreground-800">{r.label}</th>
                  {r.values.map((v, j) => <td key={packages[j].name} className="p-4 text-center text-foreground-700">{v}</td>)}
                </tr>
              ))}
              <tr className="bg-background-50">
                <td className="p-4" />
                {packages.map((p) => (
                  <td key={p.name} className="p-4 text-center">
                    <button type="button" onClick={() => select(p.name)} className="px-4 py-2 rounded-md bg-primary-700 text-background-50 font-semibold whitespace-nowrap hover:bg-primary-800 cursor-pointer">Select Package</button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}