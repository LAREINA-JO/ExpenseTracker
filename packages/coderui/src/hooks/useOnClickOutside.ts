import { useEffect, type MutableRefObject } from 'react';

const useOnClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void,
  deps: React.DependencyList,
) => {
  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }

    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as HTMLElement)) {
        handler();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, deps);
};

export default useOnClickOutside;
