import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import PageHeader from '@/components/base/PageHeader';
import { services } from '@/mocks/siteContent';

export default function Services() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo(0, 0);
  }, [hash]);

  return (
    <Layout>
      <PageHeader eyebrow="Services" title="Complete home security services" text="From equipment to installation and round-the-clock monitoring, WHSS covers every layer of your home's protection." />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 space-y-14 md:space-y-20">
        {services.map((s, i) => (
          <section key={s.id} id={s.id} className={`scroll-mt-24 flex flex-col gap-8 items-center ${i % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            <div className="w-full lg:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <img src={s.img} alt={`${s.title} by WHSS`} title={`${s.title} - WHSS home security`} className="w-full h-full object-cover object-top" />
            </div>
            <div className="w-full lg:w-1/2">
              <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-100 text-accent-700 mb-4"><i className={`${s.icon} text-2xl`} /></span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-3">{s.title}</h2>
              <p className="text-foreground-700 mb-5">{s.desc}</p>
              <ul className="space-y-2 mb-6">
                {s.points.map((p) => <li key={p} className="flex gap-2 text-foreground-800"><i className="ri-checkbox-circle-fill text-secondary-600" />{p}</li>)}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/packages" className="px-5 py-2.5 rounded-md bg-primary-700 text-background-50 font-semibold whitespace-nowrap hover:bg-primary-800 cursor-pointer">See Packages</Link>
                <Link to="/quote" className="px-5 py-2.5 rounded-md border border-primary-300 text-primary-700 font-semibold whitespace-nowrap hover:bg-primary-50 cursor-pointer">Request a Quote</Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}