import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/feature/Layout';
import PageHeader from '@/components/base/PageHeader';
import QuoteForm from './components/QuoteForm';

const valid = ['Basic', 'Standard', 'Premium'];

export default function Quote() {
  const [params] = useSearchParams();
  const raw = params.get('package') ?? '';
  const initial = valid.includes(raw) ? raw : '';

  return (
    <Layout>
      <PageHeader eyebrow="Contact / Request a Quote" title="Get your free security quote" text="Tell us about your home and we'll recommend the right system. Most customers hear back within one business day." />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 min-w-0">
          {initial && <p className="mb-4 text-sm bg-secondary-50 border border-secondary-200 text-secondary-900 rounded-lg px-4 py-3"><i className="ri-checkbox-circle-line mr-1" />You selected the <strong>{initial}</strong> package. You can change it below.</p>}
          <QuoteForm initialPackage={initial} />
        </div>
        <aside className="space-y-5">
          <div className="bg-primary-900 text-background-50 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Contact WHSS</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3"><i className="ri-phone-line text-accent-300" /><a href="tel:+15196999477" className="hover:text-accent-200">519-699-WHSS</a></li>
              <li className="flex gap-3"><i className="ri-mail-line text-accent-300" /><a href="mailto:inquire@whss.com" className="hover:text-accent-200">Inquire@whss.com</a></li>
              <li className="flex gap-3"><i className="ri-map-pin-line text-accent-300" />401 Sunset Avenue, Windsor, ON</li>
              <li className="flex gap-3"><i className="ri-time-line text-accent-300" />Mon–Sat, 8am–8pm</li>
            </ul>
          </div>
          <div className="bg-background-100 rounded-2xl p-6 border border-background-200">
            <h2 className="font-bold text-primary-900 mb-2">What happens next?</h2>
            <ol className="space-y-2 text-sm text-foreground-700 list-decimal list-inside">
              <li>Your request is stored in our system as <strong>New</strong>.</li>
              <li>An advisor reviews it and marks it <strong>In Progress</strong>.</li>
              <li>After your consultation or install, it's <strong>Completed</strong>.</li>
            </ol>
          </div>
        </aside>
      </div>
    </Layout>
  );
}