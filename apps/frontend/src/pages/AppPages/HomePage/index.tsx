import React, { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAppSelector } from '@/hooks/redux';
import type { GetTransactionsReqBody } from '@expense-tracker/schemas';
import { useGetTransactionsQuery } from '@/store/api/transactionsApi';
import {
  groupTransactionsByCategory,
  groupTransactionsByTransactionDate,
} from './utils/groupData';
import useEcharts from '@/hooks/useEcharts';

type HomePageProps = JSX.IntrinsicElements['div'];

const HomePage: React.FC<HomePageProps> = ({ className }: HomePageProps) => {
  const selectedStartDate = useAppSelector(
    (state) => state.ui.globalState.selectedStartDate,
  );
  const selectedEndDate = useAppSelector(
    (state) => state.ui.globalState.selectedEndDate,
  );
  const selectedAccount = useAppSelector(
    (state) => state.ui.globalState.selectedAccount,
  );

  const [queryParam, setQueryParam] = useState<GetTransactionsReqBody>({
    orderBy: [{ createdAt: 'desc' }],
    limit: -1,
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    accountId:
      selectedAccount.value === 'all' ? undefined : +selectedAccount.value,
  });

  const transactionsByDateChartRef = useRef<HTMLDivElement>(null);
  const transactionsByCategoryChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedAccount.value === 'all') {
      return setQueryParam((prev) => {
        const { accountId, ...rest } = prev;
        return rest;
      });
    }

    setQueryParam((prev) => ({
      ...prev,
      accountId: parseInt(selectedAccount.value),
    }));
  }, [selectedAccount]);

  useEffect(() => {
    setQueryParam((prev) => ({
      ...prev,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    }));
  }, [selectedStartDate, selectedEndDate]);

  const { data, isLoading, isError, isSuccess } =
    useGetTransactionsQuery(queryParam);

  useEcharts(
    transactionsByDateChartRef,
    {
      xAxis: {
        type: 'category',
        splitLine: {
          show: true, // Enable grid lines on y-axis
          lineStyle: {
            type: 'dashed', // Dashed grid lines
            color: '#ccc', // Grid line color
          },
        },
        name: 'date',
      },
      yAxis: {
        type: 'value',
        name: 'amount',
      },
      series: {
        type: 'line',
        // smooth: true,
        data: groupTransactionsByTransactionDate(data?.transactions).map(
          ({ transactionDate, amount }) => [transactionDate, amount],
        ),
      },
      tooltip: {
        trigger: 'axis',
      },
    },
    'light',
    { renderer: 'svg' },
  );

  useEcharts(
    transactionsByCategoryChartRef,
    {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)', //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
      },
      series: {
        type: 'pie',
        data: groupTransactionsByCategory(data?.transactions).map(
          ({ category, amount }) => ({
            name: category,
            value: amount,
          }),
        ),
        // radius: '50%',
      },
    },
    'light',
    { renderer: 'svg' },
  );

  return (
    <div
      className={twMerge(
        clsx('-mt-24 rounded-lg bg-white px-6 py-12 shadow'),
        className,
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Expense Report</h2>
      </div>
      <div className="mt-12 flex">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading transactions</div>}
        {isSuccess && (
          <div className="grid h-[500px] w-full grid-cols-3 gap-4">
            <div className="col-span-2 h-[500px] w-full">
              <h3 className="text-xl font-bold">Transactions</h3>
              <div>
                {data.total === 0 && (
                  <div className="mt-4">No transactions found</div>
                )}
                {data.total > 0 && (
                  <div
                    className="h-[500px] w-full"
                    ref={transactionsByDateChartRef}
                  ></div>
                )}
              </div>
            </div>

            <div className="col-span-1 h-[500px] w-full">
              <h3 className="text-xl font-bold">Categories</h3>
              <div>
                {data.total === 0 && (
                  <div className="mt-4">No transactions found</div>
                )}
                {data.total > 0 && (
                  <div
                    className="h-[500px] w-full"
                    ref={transactionsByCategoryChartRef}
                  ></div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
