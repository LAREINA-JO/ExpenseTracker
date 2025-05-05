export type TriggerProps<
  ContainerElementsType extends keyof JSX.IntrinsicElements = 'div',
  T extends { onClick?: React.MouseEventHandler } = {
    onClick: (e: React.MouseEvent) => void;
  },
> = Omit<JSX.IntrinsicElements[ContainerElementsType], 'children'> & {
  children: React.ReactElement<T>;
};
