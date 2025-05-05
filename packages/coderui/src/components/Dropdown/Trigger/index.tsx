import { clsx } from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useDropdownContext } from '../Context';
import type { TriggerProps } from '@/types/compoundPattern';

type DropdownTriggerProps = TriggerProps;

const DropdownTrigger = ({ className, children }: DropdownTriggerProps) => {
  const { setIsOpen, isOpen } = useDropdownContext();
  return (
    <div className={twMerge(clsx(''), className)}>
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e);
          setIsOpen(!isOpen);
        },
      })}
    </div>
  );
};

export default DropdownTrigger;
