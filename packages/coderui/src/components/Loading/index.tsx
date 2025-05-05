import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import LoadingSvg from '@/assets/svg/loading.svg?react';

type LoadingProps = JSX.IntrinsicElements['div'];

const Loading: React.FC<LoadingProps> = ({ className }: LoadingProps) => {
  return (
    <LoadingSvg
      className={twMerge(
        clsx('inline-block h-5 w-5 animate-spin text-gray-400'),
        className,
      )}
    />
  );
};

export default Loading;
