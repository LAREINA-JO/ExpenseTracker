import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type MainProps = JSX.IntrinsicElements['main'];

const Main: React.FC<MainProps> = ({ className, children }: MainProps) => {
  return (
    <main className={twMerge(clsx('container mx-auto'), className)}>
      {children}
    </main>
  );
};

export default Main;
