import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ToastContainer as ToastifyContainer } from 'react-toastify';
import type { ToastContainerProps as ToastifyContainerProps } from 'react-toastify';

type ToastContainerProps = ToastifyContainerProps;

const ToastContainer: React.FC<ToastContainerProps> = (
  props: ToastContainerProps,
) => {
  return (
    <ToastifyContainer
      position="top-center"
      theme="colored"
      autoClose={3000}
      hideProgressBar
      className={(ctx) =>
        twMerge(
          clsx(
            ctx?.defaultClassName,
            {
              'bg-success-main': ctx?.type === 'success',
              'bg-warning-main': ctx?.type === 'warning',
              'bg-error-light': ctx?.type === 'error',
              'bg-primary-main': ctx?.type === 'info',
            },
            props.className,
          ),
        )
      }
      {...props}
    />
  );
};

export default ToastContainer;
export { toast } from 'react-toastify';
