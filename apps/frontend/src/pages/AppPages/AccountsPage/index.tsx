import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Alert, Button, Input, toast } from 'coderui';
import { FiPlus } from 'react-icons/fi';
import {
  useDeleteAccountMutation,
  useGetAccountsQuery,
} from '@/store/api/accountsApi';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import type {
  Account,
  GetAccountsReqBody,
  GetAccountsResBody,
  SerializedType,
} from '@expense-tracker/schemas';
import Table from '@/components/Table';
import CardNumber from './components/CardNumber';
import dayjs from 'dayjs';
import EditDeleteActionDropdown from '@/components/EditDeleteActionDropdown';
import EditAccountModal from './components/EditAccountModal';
import AddAccountModal from './components/AddAccountModal';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setGlobalAccount } from '@/store/slice/uiSlice';

type AccountsPageProps = JSX.IntrinsicElements['div'];

const columnHelper = createColumnHelper<GetAccountsResBody[0]>();

const AccountsPage: React.FC<AccountsPageProps> = ({
  className,
}: AccountsPageProps) => {
  const [queryParam, setQueryParam] = useState<GetAccountsReqBody>({
    orderBy: [{ createdAt: 'desc' }],
    name: '',
  });
  const { data, isLoading, isSuccess } = useGetAccountsQuery(queryParam);
  const [tableData, setTableData] = useState<GetAccountsResBody>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [accountNameSearchValue, setAccountNameSearchValue] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAccount, setEditingAccount] =
    useState<SerializedType<Account> | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteAccount] = useDeleteAccountMutation();
  const globalSelectedAccount = useAppSelector(
    (state) => state.ui.globalState.selectedAccount,
  );
  const dispatch = useAppDispatch();

  const handleEditRowData = useCallback((rowData: SerializedType<Account>) => {
    setShowEditModal(true);
    setEditingAccount(rowData);
  }, []);
  const handleDeleteRowData = useCallback(
    (rowData: SerializedType<Account>) => {
      setEditingAccount(rowData);
      setShowDeleteAlert(true);
    },
    [],
  );

  const handleAddNewClick = useCallback(() => {
    setShowAddModal(true);
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Account Name',
        cell: (prop) => prop.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor('cardNumber', {
        header: 'Card Number',
        cell: (prop) => <CardNumber originalNumber={prop.getValue()} />,
        enableSorting: false,
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: (prop) => dayjs(prop.getValue()).format('MMM DD, YYYY'),
      }),
      columnHelper.display({
        id: 'actions',
        header: 'actions',
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
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  useEffect(() => {
    // debounce query
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
      setTableData(data);
    }
  }, [data]);

  useEffect(() => {}, []);

  const handleAccountNameSearchValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAccountNameSearchValue(e.target.value);
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== 'name'),
        { id: 'name', value: e.target.value },
      ]);
    },
    [setColumnFilters, setAccountNameSearchValue],
  );

  const handleDeleteFromAccountModal = (account: SerializedType<Account>) => {
    setShowDeleteAlert(true);
    setEditingAccount(account);
  };

  const handleDelete = async (accountId: number) => {
    try {
      await deleteAccount(accountId).unwrap();
      toast.success('Account deleted successfully');
      setShowDeleteAlert(false);
      setShowEditModal(false);
      if (accountId === +globalSelectedAccount.value) {
        dispatch(setGlobalAccount({ value: 'all', label: 'All Accounts' }));
      }
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const renderTable = useCallback(() => {
    if (isLoading) {
      return <div>Is Loading Accounts</div>;
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
      ></Table>
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
        <h2 className="text-2xl font-bold">Accounts</h2>
        <Button className="flex items-center" onClick={handleAddNewClick}>
          <FiPlus className="mr-1 inline" /> <span>Add New</span>
        </Button>
      </div>
      <div className="mt-10 space-y-10">
        <Input
          value={accountNameSearchValue}
          onChange={handleAccountNameSearchValueChange}
          className="w-56"
          placeholder="Search Account Name"
        />
        {renderTable()}
      </div>
      {editingAccount !== null && showEditModal && (
        <EditAccountModal
          account={editingAccount!}
          onAccountUpdateSuccess={() => setShowEditModal(false)}
          onDeleteAccount={handleDeleteFromAccountModal}
          onClose={() => {
            setShowEditModal(false);
          }}
        />
      )}
      {showAddModal && (
        <AddAccountModal
          onAccountAddSuccess={() => setShowAddModal(false)}
          onClose={() => {
            setShowAddModal(false);
          }}
        />
      )}
      {showDeleteAlert && (
        <Alert
          onConfirm={() => handleDelete(editingAccount!.id)}
          onCancel={() => setShowDeleteAlert(false)}
          confirmButtonText="Delete"
          confirmButtonClassName="bg-error-main hover:bg-error-dark"
        >
          <div className="space-y-4 p-4">
            <h3 className="text-xl font-bold">Are you absolutely sure ?</h3>
            <h4 className="">
              The action will remove your account and all associated categories
              and transactions. You <strong>cannot undo</strong> this actions.
            </h4>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default AccountsPage;
