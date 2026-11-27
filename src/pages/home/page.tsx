import { Link } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import { services } from '@/mocks/siteContent';

const journeySteps = [
  { icon: 'ri-file-list-3-line', title: 'Tell us about your home', text: 'Share a few details online in under two minutes — property type, entry points and what matters most to you.' },
  { icon: 'ri-user-voice-line', title: 'Talk to a specialist', text: 'A local advisor reviews your details and calls back with a recommendation built around your home.' },
  { icon: 'ri-tools-line', title: 'Professional installation', text: 'Certified technicians fit and test your system, usually within the same week.' },
  { icon: 'ri-smartphone-line', title: 'Live in your app', text: 'Arm, disarm and watch your cameras from anywhere, with our monitoring team behind you.' },
  { icon: 'ri-shield-star-line', title: 'Ongoing support', text: 'Maintenance, updates and a real person on the line whenever you need one.' },
];

export default function Home() {
  return (
    <Layout>
      <section className="relative min-h-[560px] md:h-[min(100vh,720px)] flex items-center overflow-hidden">
        <img src="https://readdy.ai/api/search-image?query=Beautiful%20modern%20two%20storey%20suburban%20family%20home%20at%20dusk%20with%20warm%20interior%20lights%2C%20discreet%20white%20security%20camera%20on%20the%20facade%2C%20deep%20navy%20blue%20evening%20sky%2C%20calm%20and%20safe%20atmosphere%2C%20professional%20architectural%20photography&width=1920&height=1080&seq=whss-hero&orientation=landscape" alt="Secure modern family home at dusk protected by WHSS" title="WHSS home security" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/80 to-primary-900/20" />
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-2xl text-background-50">
            <p className="inline-flex items-center gap-2 bg-accent-500/20 text-accent-200 px-3 py-1 rounded-full text-sm font-semibold mb-5"><i className="ri-map-pin-line" /> Serving Windsor-Essex homes</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">Smarter security for every Windsor home.</h1>
            <p className="text-lg text-foreground-100 mb-8">WHSS designs, installs and monitors connected home security systems — cameras, smart alarms, smart locks and 24/7 professional monitoring — all managed from one app.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/services" className="px-6 py-3 rounded-md bg-background-50 text-primary-900 font-bold text-center whitespace-nowrap hover:bg-accent-100 cursor-pointer">Explore Services</Link>
              <Link to="/quote" className="px-6 py-3 rounded-md bg-accent-500 text-primary-950 font-bold text-center whitespace-nowrap hover:bg-accent-400 cursor-pointer">Get a Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-accent-600 font-semibold uppercase tracking-wider text-sm mb-2">Our Mission</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Peace of mind, backed by people and data.</h2>
          <p className="text-foreground-700 mb-4">Our mission is to make professional-grade home security simple, affordable and responsive for families across Windsor. We combine reliable equipment with a local monitoring team and modern information systems that help us respond faster and serve customers better.</p>
          <ul className="space-y-3">
            {['Locally owned monitoring centre in Windsor', 'Certified technicians and same-week installs', 'Transparent monthly plans with no hidden fees'].map((t) => (
              <li key={t} className="flex gap-3 items-start text-foreground-800"><span className="w-6 h-6 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-700 shrink-0"><i className="ri-check-line" /></span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['2,400+', 'Homes protected'], ['30 sec', 'Avg. alarm response'], ['24/7', 'Live monitoring'], ['4.9/5', 'Customer rating']].map(([n, l]) => (
            <div key={l} className="bg-background-100 border border-background-200 rounded-xl p-6">
              <p className="font-heading text-3xl font-bold text-primary-700">{n}</p>
              <p className="text-foreground-600 text-sm mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-accent-600 font-semibold uppercase tracking-wider text-sm mb-2">Solutions</p>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900">Home security solutions</h2>
            </div>
            <Link to="/services" className="text-primary-600 font-semibold hover:text-accent-600 whitespace-nowrap">View all services <i className="ri-arrow-right-line" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {services.map((s) => (
              <Link key={s.id} to={`/services#${s.id}`} className="bg-background-50 rounded-xl p-5 border border-background-200 hover:border-accent-400 hover:shadow-lg transition cursor-pointer">
                <span className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 mb-4"><i className={`${s.icon} text-2xl`} /></span>
                <h3 className="font-bold text-primary-900 mb-2">{s.title}</h3>
                <p className="text-sm text-foreground-600 line-clamp-3">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-900 text-background-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <p className="text-accent-300 font-semibold uppercase tracking-wider text-sm mb-2">How It Works</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">From first call to a protected home in under a week</h2>
          <p className="text-foreground-200 max-w-3xl mb-10">No call centres, no pressure and no long contracts. Here is exactly what happens after you request a quote.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {journeySteps.map((m, i) => (
              <div key={m.title} className="bg-primary-800 rounded-xl p-5 border border-primary-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-500 text-primary-950"><i className={`${m.icon} text-xl`} /></span>
                  <span className="text-accent-300 font-heading font-bold">0{i + 1}</span>
                </div>
                <h3 className="font-bold mb-1">{m.title}</h3>
                <p className="text-sm text-foreground-200">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-3">Ready to protect your home?</h2>
        <p className="text-foreground-600 mb-6">Compare our packages or request a free, no-obligation quote.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/packages" className="px-6 py-3 rounded-md border-2 border-primary-700 text-primary-700 font-bold whitespace-nowrap hover:bg-primary-50 cursor-pointer">Compare Packages</Link>
          <Link to="/quote" className="px-6 py-3 rounded-md bg-primary-700 text-background-50 font-bold whitespace-nowrap hover:bg-primary-800 cursor-pointer">Get a Free Quote</Link>
        </div>
      </section>
    </Layout>
  );
}