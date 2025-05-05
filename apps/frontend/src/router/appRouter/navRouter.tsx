import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
const AccountsPage = lazy(() => import('@/pages/AppPages/AccountsPage'));
const HomePage = lazy(() => import('@/pages/AppPages/HomePage'));
const CategoriesPage = lazy(() => import('@/pages/AppPages/CategoriesPage'));
const TransactionsPage = lazy(
  () => import('@/pages/AppPages/TransactionsPage'),
);

const navRouter: RouteObject[] = [
  { index: true, element: <Navigate replace to="home" /> },
  { path: 'home', element: <HomePage /> },
  {
    path: 'accounts',
    element: <AccountsPage />,
  },
  {
    path: 'categories',
    element: <CategoriesPage />,
  },
  {
    path: 'transactions',
    element: <TransactionsPage />,
  },
];

export default navRouter;
