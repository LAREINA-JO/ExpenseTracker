import { clsx } from 'clsx';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { twMerge } from 'tailwind-merge';

type AlertProps = JSX.IntrinsicElements['div'] & {
  onConfirm: () => void;
  onCancel: () => void;
  buttonGroupClassName?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  isLoading?: boolean;
};

const Alert = ({
  className,
  children,
  onConfirm,
  onCancel,
  buttonGroupClassName,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  confirmButtonClassName,
  cancelButtonClassName,
  isLoading = false,
}: AlertProps) => {
  return (
    <Modal
      triggerMode="manual"
      onClose={onCancel}
      className={twMerge(clsx('p-8', className))}
    >
      {children}
      <div
        className={twMerge(
          clsx('mt-4 flex justify-end space-x-4'),
          buttonGroupClassName,
        )}
      >
        <Button
          isLoading={isLoading}
          className={twMerge(
            clsx('bg-slate-500 hover:translate-y-0', {
              'hover:bg-slate-600': !isLoading,
            }),
            cancelButtonClassName,
          )}
          onClick={onCancel}
        >
          {cancelButtonText}
        </Button>
        <Button
          isLoading={isLoading}
          className={twMerge(
            clsx('hover:translate-y-0', confirmButtonClassName),
          )}
          onClick={onConfirm}
        >
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default Alert;
