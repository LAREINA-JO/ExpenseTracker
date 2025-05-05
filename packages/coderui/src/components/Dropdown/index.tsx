import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import DropdownContext from './Context';
import DropdownMenu from './Menu';
import DropdownTrigger from './Trigger';
import DropdownMenuItem from './MenuItem';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useRef, useState } from 'react';

type DropdownProps = JSX.IntrinsicElements['div'];

const Dropdown: React.FC<DropdownProps> & {
  Menu: typeof DropdownMenu;
  MenuItem: typeof DropdownMenuItem;
  Trigger: typeof DropdownTrigger;
} = ({ className, children }: DropdownProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => {
    setIsOpen(false);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={twMerge(clsx('relative'), className)} ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.MenuItem = DropdownMenuItem;

export default Dropdown;
