import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type NotFoundProps = JSX.IntrinsicElements['div'];

const NotFound: React.FC<NotFoundProps> = ({ className }: NotFoundProps) => {
  return (
    <div className={twMerge(clsx(''), className)}>Pages was not found.</div>
  );
};

export default NotFound;
