import { createHashRouter, Navigate } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import AppLayout from '@/layout/AppLayout';
import AuthLayout from '@/layout/AuthLayout';
import authRouter from './authRouter';
import appRouter from './appRouter';
import AuthRequiredLoader from '@/utils/Auth/AuthRequiredLoader';

const router: ReturnType<typeof createHashRouter> = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    loader: AuthRequiredLoader,
    children: appRouter,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRouter,
  },
  { path: 'redirect', element: <Navigate replace to="/home" /> },
  // Not found routes work as you'd expect
  { path: '*', element: <NotFound /> },
]);

export default router;
