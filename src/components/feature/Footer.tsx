import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-foreground-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="font-heading font-bold text-background-50 text-lg mb-2">WHSS</p>
          <p className="text-sm">Windsor Home Security Solutions — locally owned protection for families and businesses across Windsor-Essex.</p>
        </div>
        <div>
          <p className="font-semibold text-background-50 mb-3">Explore</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-accent-300">Services</Link></li>
            <li><Link to="/packages" className="hover:text-accent-300">Security Packages</Link></li>
            <li><Link to="/quote" className="hover:text-accent-300">Request a Quote</Link></li>
            <li><Link to="/admin" className="hover:text-accent-300">Staff Portal</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-background-50 mb-3">Contact</p>
          <ul className="space-y-2 text-sm">
            <li>401 Sunset Avenue, Windsor, ON</li>
            <li><a href="tel:+15196999477" className="hover:text-accent-300">519-699-WHSS</a></li>
            <li><a href="mailto:inquire@whss.com" className="hover:text-accent-300">Inquire@whss.com</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-background-50 mb-3">Hours</p>
          <p className="text-sm">Sales: Mon–Sat, 8am–8pm</p>
          <p className="text-sm">Monitoring: 24/7/365</p>
        </div>
      </div>
      <div className="border-t border-primary-800 px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-foreground-300 max-w-7xl mx-auto">
        <span>© 2026 WHSS — Windsor Home Security Solutions. All rights reserved.</span>
        <span>Proudly serving Windsor-Essex, Ontario</span>
      </div>
    </footer>
  );
}