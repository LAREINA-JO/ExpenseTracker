import { createContext, useContext, useState } from 'react';

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} | null;

const ModalContext = createContext<ModalContextType>(null);

export const ModalContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error(
      'Cannot found modal context. Please make sure you are using Modal with mode contextual.',
    );
  }
  return context;
};

export default ModalContext;
