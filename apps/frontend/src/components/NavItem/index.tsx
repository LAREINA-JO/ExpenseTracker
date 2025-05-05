import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavLink, type NavLinkProps } from 'react-router-dom';

type NavItemProps = JSX.IntrinsicElements['div'] & NavLinkProps;

const NavItem = ({ className, to, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        twMerge(
          clsx(
            'rounded-lg px-2 py-2 text-sm capitalize text-slate-100 transition-all md:px-2 md:text-base lg:px-4 lg:text-lg',
            {
              'bg-slate-200 bg-opacity-50': isActive,
            },
            className,
          ),
        )
      }
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
