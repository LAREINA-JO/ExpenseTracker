import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Button } from 'coderui';
import dayjs from 'dayjs';

type DatePickerProps = JSX.IntrinsicElements['div'] & {
  onSelectDate: (date: Date) => void;
  date: Date;
  triggerButtonClassName?: string;
  dayPickerRootClassName?: string;
  error?: string;
};

const defaultClassNames = getDefaultClassNames();
const DatePicker: React.FC<DatePickerProps> = ({
  className,
  onSelectDate,
  date,
  triggerButtonClassName,
  dayPickerRootClassName,
  error,
}: DatePickerProps) => {
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(() => {
    setShowDayPicker(false);
    onSelectDate(selectedDate);
  }, [selectedDate]);

  const toggleShowDayPicker = () => {
    setShowDayPicker(!showDayPicker);
  };

  return (
    <div className={twMerge(clsx('relative'), className)}>
      <Button
        className={twMerge(
          clsx(
            'flex w-full items-center justify-between border bg-transparent py-3 text-inherit shadow-none hover:translate-y-0 hover:bg-transparent',
            triggerButtonClassName,
          ),
        )}
        onClick={toggleShowDayPicker}
        type="button"
      >
        <span className="mr-2 text-lg">
          {dayjs(selectedDate).format('MMM DD, YYYY')}
        </span>
        {showDayPicker ? (
          <MdKeyboardArrowUp className="h-6 w-6" />
        ) : (
          <MdKeyboardArrowDown className="h-6 w-6" />
        )}
      </Button>
      {error && (
        <span className="mt-2 inline-block text-error-light">{error}</span>
      )}
      {showDayPicker && (
        <DayPicker
          captionLayout="dropdown"
          mode="single"
          required
          selected={selectedDate}
          defaultMonth={date}
          onSelect={setSelectedDate}
          endMonth={new Date()}
          classNames={{
            root: twMerge(
              clsx(
                defaultClassNames.root,
                'shadow-lg p-5 bg-slate-50 rounded mt-1 !absolute z-50',
                dayPickerRootClassName,
              ),
            ),
            today: 'border-none',
            selected: 'bg-slate-800 rounded-lg text-slate-100',
            chevron: 'fill-neutral-400',
          }}
        />
      )}
    </div>
  );
};

export default React.memo(DatePicker);
