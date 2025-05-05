import React, { useCallback, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { Input, useOnClickOutside } from '@/index';
import type { InputProps } from '../Input';

export type Option = {
  value: string;
  label: string;
};

type SelectProps = Omit<InputProps, 'onChange'> & {
  options: Option[];
  onSelectOption?: (option: Option) => void;
  initialValue?: string;
  clearable?: boolean;
};

const Select: React.FC<SelectProps> = ({
  className,
  options,
  inputClassName,
  onSelectOption,
  initialValue,
  clearable,
  ...restProps
}: SelectProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dropDownRef = useRef<HTMLUListElement | null>(null);
  const selectedOptionRef = useRef<HTMLLIElement | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === initialValue),
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
    // when dropdown is open, we should centralized the selected option
    if (
      !showOptions ||
      dropDownRef === null ||
      !dropDownRef.current ||
      selectedOptionRef === null ||
      !selectedOptionRef.current
    ) {
      return;
    }

    const dropdownOffsetHeight = dropDownRef.current.offsetHeight;
    const selectOptionOffsetTop = selectedOptionRef.current.offsetTop;
    const selectOptionOffsetHeight = selectedOptionRef.current.offsetHeight;

    if (selectOptionOffsetTop > dropdownOffsetHeight / 2) {
      dropDownRef.current.scrollTop =
        selectOptionOffsetTop -
        dropdownOffsetHeight / 2 +
        selectOptionOffsetHeight;
    }
  }, [selectedOption, showOptions, dropDownRef, selectedOptionRef]);

  useOnClickOutside(containerRef, () => {
    if (showOptions) {
      setShowOptions(false);
    }
  }, [containerRef, showOptions]);

  const handleFocus = useCallback(() => {
    setShowOptions(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (isClickOption) {
      return;
    }
    setShowOptions(false);
  }, [isClickOption]);

  const handleOptionMouseDown = useCallback(() => {
    setIsClickOption(true);
  }, []);

  const handleSelectOption = useCallback(
    (option: Option) => {
      setSelectedOption(option);
      setShowOptions(false);
      onSelectOption &&
        option.value !== selectedOption?.value &&
        onSelectOption(option);
      setIsClickOption(false);
    },
    [onSelectOption, selectedOption],
  );

  const renderEndIcons = useCallback(() => {
    const clearSelection = () => {
      setSelectedOption(undefined);
    };

    return (
      <div className="flex">
        {clearable && (
          <button
            onClick={clearSelection}
            tabIndex={!clearable || !selectedOption ? -1 : 0}
          >
            <IoClose
              className={twMerge(
                clsx({
                  'opacity-0': !clearable || !selectedOption,
                }),
              )}
            />
          </button>
        )}
        {showOptions ? (
          <MdKeyboardArrowUp className="h-6 w-6" />
        ) : (
          <MdKeyboardArrowDown className="h-6 w-6" />
        )}
      </div>
    );
  }, [clearable, showOptions, selectedOption]);

  return (
    <div
      className={twMerge(clsx('relative inline-block', className))}
      ref={containerRef}
    >
      <Input
        className={twMerge(clsx('cursor-pointer'))}
        type="text"
        value={selectedOption?.label ?? ''}
        onChange={() => {}}
        onFocus={handleFocus}
        onBlur={handleBlur}
        inputClassName={clsx(
          'caret-transparent cursor-pointer',
          inputClassName,
        )}
        endIcon={renderEndIcons()}
        {...restProps}
      />
      {showOptions && (
        <ul
          className="absolute z-50 mt-1 max-h-60 cursor-pointer overflow-scroll rounded-md bg-white py-2 shadow-paper"
          style={{ width: dropdownWidth }}
          tabIndex={-1}
          ref={dropDownRef}
        >
          {options.map((option) => (
            <li
              key={option.value}
              tabIndex={-1}
              ref={
                selectedOption?.value === option.value
                  ? selectedOptionRef
                  : null
              }
            >
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
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
