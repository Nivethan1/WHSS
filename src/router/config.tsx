import type { RouteObject } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/home/page';
import Services from '@/pages/services/page';
import Packages from '@/pages/packages/page';
import Quote from '@/pages/quote/page';
import AdminLogin from '@/pages/admin/login/page';
import AdminDashboard from '@/pages/admin/page';

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/services', element: <Services /> },
  { path: '/packages', element: <Packages /> },
  { path: '/quote', element: <Quote /> },
  { path: '/admin/login', element: <AdminLogin /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '*', element: <NotFound /> },
];

export default routes;