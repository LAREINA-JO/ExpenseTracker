import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Alert, Button, Input, toast } from 'coderui';
import { FiPlus } from 'react-icons/fi';
import type { Valueof } from '@/types/helper';
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '@/store/api/transactionsApi';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import type {
  Transaction,
  GetTransactionsReqBody,
  GetTransactionsResBody,
  SerializedType,
} from '@expense-tracker/schemas';
import Table from '@/components/Table';
import dayjs from 'dayjs';
import EditTransactionModal from './components/EditTransactionModal';
import AddTransactionModal from './components/AddTransactionModal';
import EditDeleteActionDropdown from '@/components/EditDeleteActionDropdown';
import { useAppSelector } from '@/hooks/redux';

type TransactionsPageProps = JSX.IntrinsicElements['div'];

const columnHelper =
  createColumnHelper<
    Valueof<Pick<GetTransactionsResBody, 'transactions'>>[0]
  >();

const pageSize = 101;

const TransactionsPage: React.FC<TransactionsPageProps> = ({
  className,
}: TransactionsPageProps) => {
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
    description: '',
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    limit: pageSize,
    start: 0,
    accountId:
      selectedAccount.value === 'all' ? undefined : +selectedAccount.value,
  });
  const { data, isLoading, isSuccess } = useGetTransactionsQuery(queryParam);
  const [tableData, setTableData] = useState<
    Valueof<Pick<GetTransactionsResBody, 'transactions'>>
  >([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [descriptionSearchValue, setDescriptionSearchValue] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<SerializedType<Transaction> | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize, //default page size
  });

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize,
    });
    if (selectedAccount.value === 'all') {
      return setQueryParam((prev) => {
        const { accountId, ...rest } = prev;
        return { ...rest, start: 0 };
      });
    }

    setQueryParam((prev) => ({
      ...prev,
      accountId: parseInt(selectedAccount.value),
      start: 0,
    }));
  }, [selectedAccount]);

  useEffect(() => {
    setQueryParam((prev) => ({
      ...prev,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    }));
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    setQueryParam((prev) => ({
      ...prev,
      start: pagination.pageIndex * pagination.pageSize,
    }));
  }, [pagination]);

  const handleEditRowData = useCallback(
    (rowData: SerializedType<Transaction>) => {
      setShowEditModal(true);
      setEditingTransaction(rowData);
    },
    [],
  );

  const handleDeleteRowData = useCallback(
    (rowData: SerializedType<Transaction>) => {
      setEditingTransaction(rowData);
      setShowDeleteAlert(true);
    },
    [],
  );

  const handleAddNewClick = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor('transactionDate', {
        header: 'Transaction Date',
        cell: (prop) => dayjs(prop.getValue()).format('MMM DD, YYYY'),
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (prop) => prop.getValue(),
      }),
      columnHelper.accessor('account.name', {
        header: 'Account',
        enableSorting: false,
      }),
      columnHelper.accessor('category.name', {
        header: 'Category',
        enableSorting: false,
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: (prop) => prop.getValue() ?? '-',
        enableSorting: false,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <EditDeleteActionDropdown
            onEdit={() => handleEditRowData(row.original)}
            onDelete={() => handleDeleteRowData(row.original)}
          />
        ),
      }),
    ],
    [handleEditRowData, handleDeleteRowData],
  );

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // pagination
    manualPagination: true, // Tell the table that pagination is server-side
    onPaginationChange: setPagination,
    pageCount: Math.ceil(total / pageSize), // How many pages to show in the pagination
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filters = columnFilters.reduce(
        (acc, filter) => ({
          ...acc,
          [filter.id]: filter.value,
        }),
        {},
      );
      setQueryParam({
        ...queryParam,
        ...filters,
        orderBy: [
          ...sorting.map((s) => ({
            [s.id]: s.desc ? 'desc' : 'asc',
          })),
          { createdAt: 'desc' },
        ],
      });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [sorting, columnFilters]);

  useEffect(() => {
    if (data) {
      setTableData(data.transactions);
      setTotal(data.total);
    }
  }, [data]);

  const handleDescriptionSearchValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescriptionSearchValue(e.target.value);
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== 'description'),
        { id: 'description', value: e.target.value },
      ]);
    },
    [setColumnFilters],
  );

  const handleDeleteFromTransactionModal = (
    transaction: SerializedType<Transaction>,
  ) => {
    setShowDeleteAlert(true);
    setEditingTransaction(transaction);
  };

  const handleDelete = async (transactionId: number) => {
    try {
      await deleteTransaction(transactionId).unwrap();
      toast.success('Transaction deleted successfully');
      setShowDeleteAlert(false);
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to delete transaction');
    }
  };

  const renderTable = useCallback(() => {
    if (isLoading) {
      return <div>Loading Transactions...</div>;
    }

    if (!isSuccess) {
      return null;
    }

    return (
      <Table
        table={table}
        className="w-full rounded-lg border"
        headerTrClassName="bg-neutral-100"
        headerThClassName="text-gray-600 p-4"
        bodyTdClassName="p-4"
      />
    );
  }, [isLoading, isSuccess, table]);

  return (
    <div
      className={twMerge(
        clsx('-mt-24 rounded-lg bg-white px-6 py-12 shadow'),
        className,
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <Button className="flex items-center" onClick={handleAddNewClick}>
          <FiPlus className="mr-1 inline" /> <span>Add New</span>
        </Button>
      </div>
      <div className="mt-10 space-y-10">
        <Input
          value={descriptionSearchValue}
          onChange={handleDescriptionSearchValueChange}
          className="w-56"
          placeholder="Search Description"
        />
        {renderTable()}
      </div>
      {editingTransaction !== null && showEditModal && (
        <EditTransactionModal
          transaction={editingTransaction}
          onTransactionUpdateSuccess={() => setShowEditModal(false)}
          onDeleteTransaction={handleDeleteFromTransactionModal}
          onClose={() => {
            setShowEditModal(false);
          }}
        />
      )}
      {showAddModal && (
        <AddTransactionModal
          onTransactionAddSuccess={() => setShowAddModal(false)}
          onClose={() => {
            setShowAddModal(false);
          }}
        />
      )}
      {showDeleteAlert && (
        <Alert
          onConfirm={() => handleDelete(editingTransaction!.id)}
          onCancel={() => setShowDeleteAlert(false)}
          confirmButtonText="Delete"
          confirmButtonClassName="bg-error-main hover:bg-error-dark"
        >
          <div className="space-y-4 p-4">
            <h3 className="text-xl font-bold">Are you absolutely sure?</h3>
            <h4 className="">
              This action cannot be undone. This will permanently delete the
              transaction.
            </h4>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default TransactionsPage;
