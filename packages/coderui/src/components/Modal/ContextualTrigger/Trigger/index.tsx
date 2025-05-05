import { cloneElement } from 'react';
import { useModalContext } from '../Context';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import type { TriggerProps } from '@/types/compoundPattern';

export type ContextualModalTriggerProps = TriggerProps;

const ContextualModalTrigger = ({
  children,
  className,
}: ContextualModalTriggerProps) => {
  const { setIsOpen } = useModalContext();
  return (
    <div className={twMerge(clsx(''), className)}>
      {cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          setIsOpen(true);
          children.props.onClick?.(e);
        },
      })}
    </div>
  );
};

export default ContextualModalTrigger;
