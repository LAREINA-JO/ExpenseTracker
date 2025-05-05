import type { ManualTriggerModalProps } from './ManualTrigger';
import type { ContextualModalProps } from './ContextualTrigger';
import ManualTriggerModal from './ManualTrigger';
import ContextualTriggerModal from './ContextualTrigger';
import ContextualModalTrigger from './ContextualTrigger/Trigger';
import ModalCloseTrigger from './ContextualTrigger/CloseTrigger';
import ContextualModalContent from './ContextualTrigger/Content';

type ModalProps =
  | ({
      triggerMode: 'manual';
    } & ManualTriggerModalProps)
  | ({
      triggerMode?: 'contextual';
    } & ContextualModalProps);

function isManualTriggerProps(
  value: ModalProps,
): value is ManualTriggerModalProps {
  return value['triggerMode'] === 'manual';
}

const Modal: React.FC<ModalProps> & {
  Trigger: typeof ContextualModalTrigger;
  CloseTrigger: typeof ModalCloseTrigger;
  Content: typeof ContextualModalContent;
} = (props: ModalProps) => {
  if (isManualTriggerProps(props)) {
    const { triggerMode, ...restProps } = props;
    return <ManualTriggerModal {...restProps} />;
  }

  const { triggerMode, ...restProps } = props;
  return <ContextualTriggerModal {...restProps} />;
};

Modal.Trigger = ContextualModalTrigger;
Modal.CloseTrigger = ModalCloseTrigger;
Modal.Content = ContextualModalContent;

export default Modal;
