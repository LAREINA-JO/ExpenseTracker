import type { Valueof } from '@/types/helper';
import type { GetTransactionsResBody } from '@expense-tracker/schemas';
import dayjs from 'dayjs';

export const groupTransactionsByTransactionDate = (
  transactions?: Valueof<Pick<GetTransactionsResBody, 'transactions'>>,
) => {
  if (!transactions) {
    return [];
  }

  const map = new Map<string, number>();
  transactions.forEach(({ transactionDate, amount }) => {
    const date = dayjs(transactionDate).format('MMM DD, YYYY');
    if (map.has(date)) {
      map.set(date, parseFloat((map.get(date)! + amount).toFixed(2)));
    } else {
      map.set(date, amount);
    }
  });

  return Array.from(
    map.keys().map((key) => ({ transactionDate: key, amount: map.get(key)! })),
  ).toSorted(
    (a, b) =>
      new Date(a.transactionDate).getTime() -
      new Date(b.transactionDate).getTime(),
  );
};

export const groupTransactionsByCategory = (
  transactions?: Valueof<Pick<GetTransactionsResBody, 'transactions'>>,
) => {
  if (!transactions) {
    return [];
  }

  const map = new Map<string, number>();
  transactions.forEach(({ category, amount }) => {
    if (map.has(category.name)) {
      map.set(
        category.name,
        parseFloat((map.get(category.name)! + amount).toFixed(2)),
      );
    } else {
      map.set(category.name, amount);
    }
  });

  return Array.from(
    map.keys().map((key) => ({ category: key, amount: map.get(key)! })),
  );
};
