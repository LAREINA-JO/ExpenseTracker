import React from 'react';
import { ModalContextProvider } from './Context';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type ContextualModalProps = JSX.IntrinsicElements['div'];

const ContextualTriggerModal: React.FC<ContextualModalProps> = ({
  children,
  className,
  ...restProps
}: ContextualModalProps) => {
  return (
    <ModalContextProvider>
      <div className={twMerge(clsx('modal'), className)} {...restProps}>
        {children}
      </div>
    </ModalContextProvider>
  );
};

export default ContextualTriggerModal;
