export interface PackageInfo {
  name: 'Basic' | 'Standard' | 'Premium';
  price: string;
  tagline: string;
  highlight?: boolean;
  features: string[];
}

export const packages: PackageInfo[] = [
  {
    name: 'Basic',
    price: '29.99',
    tagline: 'Essential protection for condos and small homes.',
    features: ['Smart alarm hub + keypad', '4 door/window sensors', '1 indoor HD camera', 'Mobile app alerts', 'Self-monitoring'],
  },
  {
    name: 'Standard',
    price: '49.99',
    tagline: 'Our most balanced plan for family homes.',
    highlight: true,
    features: ['Everything in Basic', '8 door/window sensors', '2 indoor + 1 outdoor camera', '1 smart lock', '24/7 professional monitoring', '30-day cloud video'],
  },
  {
    name: 'Premium',
    price: '79.99',
    tagline: 'Complete coverage for larger properties.',
    features: ['Everything in Standard', 'Unlimited sensors', '4 outdoor 2K cameras', '2 smart locks', 'Smoke & flood detection', 'Priority technician visits', '90-day cloud video'],
  },
];

export const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: 'Monthly price (example)', values: ['$29.99', '$49.99', '$79.99'] },
  { label: 'Door / window sensors', values: ['4', '8', 'Unlimited'] },
  { label: 'Security cameras', values: ['1 indoor', '3 (1 outdoor)', '6 (4 outdoor 2K)'] },
  { label: 'Smart locks', values: ['—', '1', '2'] },
  { label: '24/7 professional monitoring', values: ['—', 'Included', 'Included'] },
  { label: 'Cloud video storage', values: ['—', '30 days', '90 days'] },
  { label: 'Smoke & flood detection', values: ['—', '—', 'Included'] },
  { label: 'Installation', values: ['Self-install', 'Professional', 'Professional + priority'] },
];

export const services = [
  {
    id: 'cameras',
    icon: 'ri-camera-line',
    title: 'Security Cameras',
    desc: 'Indoor and outdoor HD and 2K cameras with night vision, motion zones and person detection. Watch live or review clips from the WHSS app.',
    points: ['Night vision up to 30 m', 'Weatherproof outdoor models', 'Smart person & vehicle alerts'],
    img: 'https://readdy.ai/api/search-image?query=Modern%20white%20outdoor%20security%20camera%20mounted%20on%20the%20exterior%20wall%20of%20a%20contemporary%20suburban%20home%2C%20soft%20daylight%2C%20clean%20light%20blue%20sky%20background%2C%20professional%20product%20photography%2C%20sharp%20detail&width=900&height=640&seq=whss-svc-cam&orientation=landscape',
  },
  {
    id: 'alarms',
    icon: 'ri-alarm-warning-line',
    title: 'Smart Alarm Systems',
    desc: 'A connected alarm hub with entry sensors, motion detectors and a touchscreen keypad. Arm or disarm anywhere and get instant notifications.',
    points: ['Cellular + Wi-Fi backup', 'Pet-friendly motion sensors', 'Arm/disarm from your phone'],
    img: 'https://readdy.ai/api/search-image?query=Sleek%20white%20smart%20home%20alarm%20touchscreen%20keypad%20mounted%20on%20a%20bright%20hallway%20wall%20near%20front%20door%2C%20soft%20natural%20light%2C%20minimal%20light%20grey%20background%2C%20professional%20interior%20photography&width=900&height=640&seq=whss-svc-alarm&orientation=landscape',
  },
  {
    id: 'locks',
    icon: 'ri-lock-password-line',
    title: 'Smart Locks',
    desc: 'Keyless entry with PIN codes, fingerprint and app access. Share temporary codes with family, cleaners or contractors.',
    points: ['Auto-lock & activity log', 'Temporary guest codes', 'Works with your alarm'],
    img: 'https://readdy.ai/api/search-image?query=Close%20up%20of%20a%20modern%20matte%20black%20smart%20keypad%20door%20lock%20on%20a%20white%20front%20door%20of%20a%20contemporary%20house%2C%20soft%20daylight%2C%20clean%20minimal%20background%2C%20professional%20product%20photography&width=900&height=640&seq=whss-svc-lock&orientation=landscape',
  },
  {
    id: 'monitoring',
    icon: 'ri-customer-service-2-line',
    title: '24/7 Professional Monitoring',
    desc: 'Our Windsor monitoring centre watches over your home day and night, verifying alarms and dispatching emergency services when needed.',
    points: ['Average 30-second response', 'Police, fire & medical dispatch', 'Verified video alarms'],
    img: 'https://readdy.ai/api/search-image?query=Professional%20security%20monitoring%20centre%20with%20operators%20wearing%20headsets%20in%20front%20of%20multiple%20screens%20showing%20camera%20feeds%2C%20calm%20navy%20blue%20lighting%2C%20clean%20modern%20office%2C%20corporate%20photography&width=900&height=640&seq=whss-svc-mon&orientation=landscape',
  },
  {
    id: 'installation',
    icon: 'ri-tools-line',
    title: 'Installation & Maintenance',
    desc: 'Certified technicians install, configure and test your system, then return for annual check-ups, battery replacements and upgrades.',
    points: ['Same-week installation', 'Annual system health check', 'Lifetime equipment support'],
    img: 'https://readdy.ai/api/search-image?query=Friendly%20professional%20security%20technician%20in%20navy%20uniform%20installing%20a%20white%20security%20sensor%20on%20a%20window%20frame%20inside%20a%20bright%20modern%20home%2C%20soft%20daylight%2C%20clean%20background%2C%20corporate%20photography&width=900&height=640&seq=whss-svc-install&orientation=landscape',
  },
];