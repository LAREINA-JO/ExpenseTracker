import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = JSX.IntrinsicElements['button'];

const IconButton = ({ className, children, ...restProps }: IconButtonProps) => {
  return (
    <button className={twMerge(clsx(''), className)} {...restProps}>
      {children}
    </button>
  );
};

export default IconButton;
