import { cloneElement } from 'react';
import { useModalContext } from '../Context';
import type { TriggerProps } from '@/types/compoundPattern';

export type ContextualModalCloseTrigger = TriggerProps;

const ContextualModalCloseTrigger = ({
  children,
}: ContextualModalCloseTrigger) => {
  const { setIsOpen } = useModalContext();
  return cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      setIsOpen(false);
      children.props.onClick?.(e);
    },
  });
};

export default ContextualModalCloseTrigger;
