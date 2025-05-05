import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TriggerProps } from '@/types/compoundPattern';
import { useDropdownContext } from '../Context';
import { cloneElement } from 'react';
import React from 'react';

type DropdownMenuItemProps = TriggerProps;

const DropdownMenuItem = ({ className, children }: DropdownMenuItemProps) => {
  const { setIsOpen } = useDropdownContext();
  return (
    <div
      className={twMerge(clsx('w-full px-2 py-1 hover:bg-gray-100'), className)}
    >
      {cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          setIsOpen(false);
          children.props.onClick?.(e);
        },
      })}
    </div>
  );
};

export default DropdownMenuItem;
