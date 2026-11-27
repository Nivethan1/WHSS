import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { packages } from '@/mocks/siteContent';

const propertyTypes = ['Detached House', 'Semi-Detached House', 'Townhouse', 'Condo / Apartment', 'Small Business'];
type Errors = Partial<Record<'customer_name' | 'email' | 'phone' | 'package' | 'property_type' | 'requirements', string>>;

const inputCls = 'w-full box-border border border-background-300 rounded-md px-3 py-2.5 text-sm bg-background-50 focus:outline-none focus:ring-2 focus:ring-accent-500';

export default function QuoteForm({ initialPackage }: { initialPackage: string }) {
  const [pkg, setPkg] = useState(initialPackage);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [done, setDone] = useState<string | null>(null);
  const [chars, setChars] = useState(0);

  useEffect(() => setPkg(initialPackage), [initialPackage]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? '').trim();
    setFormError('');
    if (get('contact_alt')) { setDone(get('customer_name') || 'there'); return; }

    const v = {
      customer_name: get('customer_name'), email: get('email'), phone: get('phone'),
      package: get('package'), property_type: get('property_type'), requirements: get('requirements'),
    };
    const errs: Errors = {};
    if (v.customer_name.length < 2) errs.customer_name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Please enter a valid email address.';
    if (v.phone.replace(/\D/g, '').length < 10) errs.phone = 'Please enter a valid 10-digit phone number.';
    if (!v.package) errs.package = 'Please select a security package.';
    if (!v.property_type) errs.property_type = 'Please select your property type.';
    if (v.requirements.length > 500) errs.requirements = 'Maximum 500 characters.';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('quote_requests').insert({ ...v, requirements: v.requirements || null });
      if (error) throw error;
      setDone(v.customer_name);
      form.reset();
      setChars(0);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-background-50 rounded-2xl border border-secondary-200 p-8 text-center" role="status">
        <span className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-secondary-100 text-secondary-700 mb-4"><i className="ri-check-double-line text-3xl" /></span>
        <h2 className="text-2xl font-bold text-primary-900 mb-2">Thank you, {done}!</h2>
        <p className="text-foreground-700 mb-6">Your quote request has been received and saved. A WHSS security advisor will contact you within one business day.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={() => setDone(null)} className="px-5 py-2.5 rounded-md bg-primary-700 text-background-50 font-semibold whitespace-nowrap hover:bg-primary-800 cursor-pointer">Submit Another Request</button>
          <Link to="/" className="px-5 py-2.5 rounded-md border border-primary-300 text-primary-700 font-semibold whitespace-nowrap hover:bg-primary-50 cursor-pointer">Back to Home</Link>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-err`} className="text-sm text-[oklch(0.5_0.2_25)] mt-1">{errors[k]}</p>;

  return (
    <form id="whss-quote-form" noValidate onSubmit={onSubmit} className="quote-form relative bg-background-50 rounded-2xl border border-background-200 shadow-sm p-5 md:p-8 space-y-5">
      <input type="text" name="contact_alt" className="alt-field" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly onFocus={(e) => e.currentTarget.removeAttribute('readonly')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="min-w-0">
          <label htmlFor="customer_name" className="block text-sm font-semibold mb-1">Full name *</label>
          <input id="customer_name" name="customer_name" className={inputCls} aria-invalid={!!errors.customer_name} aria-describedby="customer_name-err" placeholder="Jane Smith" />
          {err('customer_name')}
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">Email address *</label>
          <input id="email" name="email" type="email" className={inputCls} aria-invalid={!!errors.email} aria-describedby="email-err" placeholder="jane@example.com" />
          {err('email')}
        </div>
        <div className="min-w-0">
          <label htmlFor="phone" className="block text-sm font-semibold mb-1">Phone number *</label>
          <input id="phone" name="phone" type="tel" className={inputCls} aria-invalid={!!errors.phone} aria-describedby="phone-err" placeholder="(519) 555-0123" />
          {err('phone')}
        </div>
        <div className="min-w-0">
          <label htmlFor="property_type" className="block text-sm font-semibold mb-1">Property type *</label>
          <select id="property_type" name="property_type" defaultValue="" className={`${inputCls} cursor-pointer`} aria-invalid={!!errors.property_type} aria-describedby="property_type-err">
            <option value="" disabled>Select property type</option>
            {propertyTypes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          {err('property_type')}
        </div>
      </div>

      <fieldset>
        <legend className="block text-sm font-semibold mb-2">Security package *</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {packages.map((p) => (
            <label key={p.name} className={`min-w-0 cursor-pointer rounded-lg border-2 p-3 transition ${pkg === p.name ? 'border-accent-500 bg-accent-50' : 'border-background-200 hover:border-accent-300'}`}>
              <input type="radio" name="package" value={p.name} checked={pkg === p.name} onChange={() => setPkg(p.name)} className="sr-only" />
              <span className="flex items-center justify-between font-bold text-primary-900">{p.name}{pkg === p.name && <i className="ri-checkbox-circle-fill text-accent-600" />}</span>
              <span className="text-sm text-foreground-600">${p.price}/mo</span>
            </label>
          ))}
        </div>
        {err('package')}
      </fieldset>

      <div>
        <label htmlFor="requirements" className="block text-sm font-semibold mb-1">Additional security requirements</label>
        <textarea id="requirements" name="requirements" rows={4} maxLength={500} onChange={(e) => setChars(e.target.value.length)} className={`${inputCls} resize-none`} placeholder="e.g. number of entry doors, pets, areas you want cameras to cover..." />
        <div className="flex justify-between">{err('requirements')}<span className="text-xs text-foreground-500 ml-auto mt-1">{chars}/500</span></div>
      </div>

      {formError && <p role="alert" className="text-sm rounded-md bg-[oklch(0.96_0.03_25)] text-[oklch(0.45_0.18_25)] px-3 py-2">{formError}</p>}
      <button type="submit" disabled={submitting} className="w-full py-3 rounded-md bg-primary-700 text-background-50 font-bold whitespace-nowrap hover:bg-primary-800 disabled:opacity-60 cursor-pointer">
        {submitting ? 'Submitting...' : 'Submit Quote Request'}
      </button>
      <p className="text-xs text-foreground-500 text-center">* Required fields. Your details are only used to prepare your quote — we never share them.</p>
    </form>
  );
}