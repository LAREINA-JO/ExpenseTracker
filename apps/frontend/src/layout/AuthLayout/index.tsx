import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

type AuthLayoutProps = JSX.IntrinsicElements['div'];

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <div className="min-h-screen">
      <div className="absolute -z-10 h-full w-full bg-gray-700/25 bg-auth-background bg-cover bg-blend-darken"></div>
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default AuthLayout;
