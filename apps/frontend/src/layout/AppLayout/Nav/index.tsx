import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Logo from '@/assets/svg/logo.svg';
import NavItem from '@/components/NavItem';
import type { RouteObject } from 'react-router-dom';
import { Button } from 'coderui';
import { useAppSelector } from '@/hooks/redux';
import { useSignOutMutation } from '@/store/api/userApi';

type NavProps = JSX.IntrinsicElements['nav'] & {
  router: RouteObject[];
};

const Nav: React.FC<NavProps> = ({ className, router }: NavProps) => {
  const email = useAppSelector((state) => state.user.email)!;
  const username = useAppSelector((state) => state.user.username)!;
  const [signOut] = useSignOutMutation();

  const logout = () => {
    signOut({ email, username });
  };

  return (
    <nav className={twMerge(clsx('bg-blue-600 py-4'), className)}>
      <div className="container mx-auto flex items-center">
        <NavItem
          key="logo"
          to="/"
          className="flex items-center space-x-2 md:mr-2"
        >
          <img src={Logo} className="h-11 w-11" alt="logo" />
          <h2 className="font-bold">Expense Tracker</h2>
        </NavItem>
        <div className="flex items-center space-x-2 md:space-x-4">
          {router
            .filter((router) => router.path)
            .map((router) => (
              <NavItem key={router.path} to={router.path ?? '/'}>
                {router.path}
              </NavItem>
            ))}
        </div>

        <div className="ml-auto mr-4">
          <Button className="bg-transparent shadow-none" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
