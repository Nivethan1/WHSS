import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/quote', label: 'Contact / Quote' },
  { to: '/admin', label: 'Staff Portal' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const cls = ({ isActive }: { isActive: boolean }) => `px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition-colors ${isActive ? 'text-accent-300' : 'text-background-50 hover:text-accent-200'}`;

  return (
    <header className="sticky top-0 z-50 bg-primary-900 shadow-lg">
      <nav className="w-full px-4 md:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 cursor-pointer" aria-label="WHSS home">
          <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-500 text-primary-950"><i className="ri-shield-check-fill text-xl" /></span>
          <span className="font-heading font-bold text-background-50 text-lg">WHSS</span>
          <span className="hidden lg:inline text-xs text-accent-200">Windsor Home Security Solutions</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={cls}>{l.label}</NavLink>)}
          <Link to="/quote" className="ml-3 px-4 py-2 rounded-md bg-accent-500 text-primary-950 text-sm font-bold whitespace-nowrap hover:bg-accent-400 cursor-pointer">Get a Free Quote</Link>
        </div>
        <button type="button" className="md:hidden w-10 h-10 flex items-center justify-center text-background-50 cursor-pointer" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <i className={`${open ? 'ri-close-line' : 'ri-menu-line'} text-2xl`} />
        </button>
      </nav>
      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-1 bg-primary-900">
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={cls} onClick={() => setOpen(false)}>{l.label}</NavLink>)}
        </div>
      )}
    </header>
  );
}