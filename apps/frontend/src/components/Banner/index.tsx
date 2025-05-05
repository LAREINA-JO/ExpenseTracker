import React, { useCallback } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Select, type Option } from 'coderui';
import DatePicker from '../DatePicker';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  setGlobalStartDate,
  setGlobalEndDate,
  setGlobalAccount,
} from '@/store/slice/uiSlice';
import type { Account } from '@expense-tracker/schemas';

type BannerProps = JSX.IntrinsicElements['div'] & {
  username?: string;
  accounts: Pick<Account, 'id' | 'name'>[];
};

const Banner: React.FC<BannerProps> = ({
  className,
  username,
  accounts,
}: BannerProps) => {
  const selectedAccount = useAppSelector(
    (state) => state.ui.globalState.selectedAccount,
  );
  const selectedStartDate = useAppSelector(
    (state) => state.ui.globalState.selectedStartDate,
  );
  const selectedEndDate = useAppSelector(
    (state) => state.ui.globalState.selectedEndDate,
  );
  const dispatch = useAppDispatch();

  const onSelectStartDate = useCallback(
    (date: Date) => {
      dispatch(setGlobalStartDate(dayjs(date).toISOString()));
    },
    [dispatch, setGlobalStartDate],
  );

  const onSelectEndDate = useCallback(
    (date: Date) => {
      dispatch(setGlobalEndDate(dayjs(date).endOf('day').toISOString()));
    },
    [dispatch, setGlobalEndDate],
  );

  const onSelectAccount = (option: Option) => {
    dispatch(setGlobalAccount(option));
  };

  return (
    <div
      className={twMerge(
        clsx('h-[400px] bg-gradient-to-b from-blue-600 to-blue-400 py-16'),
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl text-slate-100">
          {username ? `Welcome Back, ${username}` : 'Welcome Back'} 👋🏻
        </h1>
        <h3 className="mt-8 text-lg text-slate-100 opacity-45">
          This is your Expense Tracker Report
        </h3>
        <div className="mt-8 flex items-center space-x-8">
          <Select
            initialValue={selectedAccount.value}
            options={[
              { label: 'All Accounts', value: 'all' },
              ...accounts.map((account) => ({
                label: account.name,
                value: account.id.toString(),
              })),
            ]}
            className="w-64 shadow"
            inputClassName="bg-transparent text-lg py-1"
            inputContainerClassName="border-none bg-slate-100/15 px-4 text-slate-200"
            onSelectOption={onSelectAccount}
          />
          <div className="flex items-center space-x-2">
            <DatePicker
              date={new Date(selectedStartDate)}
              onSelectDate={onSelectStartDate}
              dayPickerRootClassName="-left-1/2"
              triggerButtonClassName="bg-slate-100/15 hover:bg-slate-100/15 text-slate-200 border-none shadow"
            />
            <span className="text-slate-200">To</span>
            <DatePicker
              date={new Date(selectedEndDate)}
              onSelectDate={onSelectEndDate}
              dayPickerRootClassName="-left-1/2"
              triggerButtonClassName="bg-slate-100/15 hover:bg-slate-100/15 text-slate-200 border-none shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
