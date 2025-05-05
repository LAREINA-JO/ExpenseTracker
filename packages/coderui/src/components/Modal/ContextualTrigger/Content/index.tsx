import { useModalContext } from '../Context';
import ManualTriggerModal from '../../ManualTrigger';

export type ContextualModalContentProps = JSX.IntrinsicElements['div'];

const ContextualModalContent = ({
  children,
  ...restProps
}: ContextualModalContentProps) => {
  const { isOpen, setIsOpen } = useModalContext();

  if (!isOpen) {
    return null;
  }

  return (
    <ManualTriggerModal onClose={() => setIsOpen(false)} {...restProps}>
      {children}
    </ManualTriggerModal>
  );
};

export default ContextualModalContent;
