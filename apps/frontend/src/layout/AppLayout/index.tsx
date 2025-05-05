import React, { Suspense, useEffect } from 'react';
import Nav from './Nav';
import Banner from '@/components/Banner';
import Main from './Main';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import navRouter from '@/router/appRouter/navRouter';
import { useAppSelector } from '@/hooks/redux';
import { useGetAccountsQuery } from '../../store/api/accountsApi';

type AppLayoutProps = JSX.IntrinsicElements['div'];

const AppLayout: React.FC<AppLayoutProps> = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const username = useAppSelector((state) => state.user.username);

  const { data = [] } = useGetAccountsQuery();

  useEffect(() => {
    if (!isAuthenticated) {
      const params = new URLSearchParams();
      params.set('from', location.pathname);
      navigate('/auth/signin');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav router={navRouter} />
      <Banner accounts={data} username={username} />
      <Main>
        <Suspense fallback={<div>Loading</div>}>
          <Outlet />
        </Suspense>
      </Main>
    </div>
  );
};

export default AppLayout;
