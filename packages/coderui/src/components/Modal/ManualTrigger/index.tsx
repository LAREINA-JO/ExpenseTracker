import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

export type ManualTriggerModalProps = JSX.IntrinsicElements['div'] & {
  onClose: () => void;
  disableBackdropClose?: boolean;
};

const ManualTriggerModal = ({
  className,
  children,
  onClose,
  disableBackdropClose = false,
}: ManualTriggerModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disableBackdropClose) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={twMerge(
        clsx(
          'fixed bottom-0 left-0 right-0 top-0 z-50 flex animate-fadeIn items-center justify-center bg-black bg-opacity-40',
        ),
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={twMerge(
          clsx('-mt-[100px] rounded-md bg-white p-10', className),
        )}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ManualTriggerModal;
