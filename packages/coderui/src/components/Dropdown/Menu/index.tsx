import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useDropdownContext } from '../Context';

type DropdownMenuProps = JSX.IntrinsicElements['div'];

const DropdownMenu = ({ className, children }: DropdownMenuProps) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={twMerge(
        clsx(
          'absolute z-50 w-max min-w-full rounded border bg-white py-1 shadow',
        ),
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
