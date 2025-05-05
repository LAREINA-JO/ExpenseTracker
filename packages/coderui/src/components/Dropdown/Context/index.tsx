import { createContext, useContext } from 'react';

type DropdownContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} | null;

const DropdownContext = createContext<DropdownContextType>(null);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (context === null) {
    throw new Error(
      'Cannot found dropdown context. Please make sure your component is wrapped in a dropdown',
    );
  }
  return context;
};

export default DropdownContext;
