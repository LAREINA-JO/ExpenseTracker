import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Input, useOnClickOutside } from '@/index';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';
import type { InputProps } from '../Input';

type Option = {
  value: string;
  label: string;
};

export type AutocompleteSyncProps = InputProps & {
  clearable?: boolean;
  options: Option[];
  initialValue?: string;
  onSelectOption?: (option: Option) => void;
  onInputChange?: (value: string) => void;
  /**
   * debounce timeout in milliseconds
   */
  debounceTime?: number;
  /**
   * custom render function for the dropdown list
   */
  customRenderOption?: (options: Option) => React.ReactNode;
  customRenderNoOption?: () => React.ReactNode;
};

const AutocompleteSync: React.FC<AutocompleteSyncProps> = ({
  options,
  initialValue,
  clearable,
  className,
  debounceTime = 300,
  onSelectOption,
  onInputChange,
  customRenderOption,
  customRenderNoOption,
  ...restProps
}: AutocompleteSyncProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === initialValue),
  );
  const [filterOptions, setFilterOptions] = useState(options);
  const [inputValue, setInputValue] = useState(
    options.find((option) => option.value === initialValue)?.label ?? '',
  );
  const [isClickOption, setIsClickOption] = useState(false);

  useEffect(() => {
    // set dropdown same width with input
    if (containerRef === null || !containerRef.current) {
      return;
    }
    setDropdownWidth(containerRef.current.offsetWidth);
  }, [containerRef]);

  useEffect(() => {
    setFilterOptions(
      options.filter((option) =>
        option.label.toLowerCase().startsWith(inputValue.toLowerCase()),
      ),
    );
  }, [inputValue, options]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onInputChange?.(inputValue);
    }, debounceTime);
    return () => clearTimeout(timeoutId);
  }, [inputValue, debounceTime]);

  useOnClickOutside(containerRef, () => {
    if (showOptions) {
      setInputValue(selectedOption?.label ?? '');
      setShowOptions(false);
    }
  }, [containerRef, showOptions]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    setShowOptions(true);
  }, []);

  const handleFocus = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (isClickOption) {
      return;
    }
    setInputValue(selectedOption?.label ?? '');
    setShowOptions(false);
  }, [selectedOption, isClickOption]);

  const handleOptionMouseDown = useCallback(() => {
    setIsClickOption(true);
  }, []);

  const handleSelectOption = useCallback(
    (option: Option) => {
      setSelectedOption(option);
      setShowOptions(false);
      setInputValue(option.label);
      setIsClickOption(false);
      onSelectOption && onSelectOption(option);
    },
    [onSelectOption],
  );

  const renderOptions = (filterOptions: Option[]) => {
    if (filterOptions.length === 0) {
      return (
        <li className="px-3 py-2 text-left text-gray-400">
          {customRenderNoOption?.() ?? 'No options'}
        </li>
      );
    }
    return filterOptions.map((option) => (
      <li key={option.value} tabIndex={-1}>
        <button
          tabIndex={-1}
          onMouseDown={handleOptionMouseDown}
          onClick={() => handleSelectOption(option)}
          className={twMerge(
            clsx('w-full px-3 py-2 text-left hover:bg-gray-50', {
              'bg-gray-100': selectedOption?.value === option.value,
            }),
          )}
        >
          {customRenderOption?.(option) ?? option.label}
        </button>
      </li>
    ));
  };

  const renderEndIcons = useCallback(() => {
    const clearSelection = () => {
      setSelectedOption(undefined);
      setInputValue('');
    };

    return (
      <div className="flex">
        <button
          onClick={clearSelection}
          tabIndex={clearable && selectedOption ? 0 : -1}
        >
          <IoClose
            className={twMerge(
              clsx({
                'opacity-0': !clearable || !selectedOption,
              }),
            )}
          />
        </button>
        {showOptions ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
      </div>
    );
  }, [clearable, showOptions, selectedOption]);

  return (
    <div className={twMerge(clsx(''), className)} ref={containerRef}>
      <Input
        type="text"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={handleInputChange}
        endIcon={renderEndIcons()}
        {...restProps}
      />
      {showOptions && (
        <ul
          className="absolute z-50 mt-1 max-h-60 cursor-pointer overflow-scroll rounded-md bg-white py-2 shadow-paper"
          style={{ width: dropdownWidth }}
          tabIndex={-1}
        >
          {renderOptions(filterOptions)}
        </ul>
      )}
    </div>
  );
};
export default AutocompleteSync;
