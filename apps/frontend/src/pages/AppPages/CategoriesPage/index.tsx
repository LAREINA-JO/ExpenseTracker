import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Alert, Button, Input, toast } from 'coderui';
import { FiPlus } from 'react-icons/fi';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '@/store/api/categoriesApi';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import type {
  Category,
  GetCategoriesReqBody,
  GetCategoriesResBody,
  SerializedType,
} from '@expense-tracker/schemas';
import Table from '@/components/Table';
import dayjs from 'dayjs';
import EditCategoryModal from './components/EditCategoryModal';
import AddCategoryModal from './components/AddCategoryModal';
import EditDeleteActionDropdown from '../../../components/EditDeleteActionDropdown';

type CategoriesPageProps = JSX.IntrinsicElements['div'];

const columnHelper = createColumnHelper<GetCategoriesResBody[0]>();

const CategoriesPage: React.FC<CategoriesPageProps> = ({
  className,
}: CategoriesPageProps) => {
  const [queryParam, setQueryParam] = useState<GetCategoriesReqBody>({
    orderBy: [{ createdAt: 'desc' }],
    name: '',
  });
  const { data, isLoading, isSuccess } = useGetCategoriesQuery(queryParam);
  const [tableData, setTableData] = useState<GetCategoriesResBody>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [categoryNameSearchValue, setCategoryNameSearchValue] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<SerializedType<Category> | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleEditRowData = useCallback((rowData: SerializedType<Category>) => {
    setShowEditModal(true);
    setEditingCategory(rowData);
  }, []);

  const handleDeleteRowData = useCallback(
    (rowData: SerializedType<Category>) => {
      setEditingCategory(rowData);
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
        header: 'Category Name',
        cell: (prop) => prop.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: (prop) => dayjs(prop.getValue()).format('MMM DD, YYYY'),
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
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
      setTableData(data);
    }
  }, [data]);

  const handleCategoryNameSearchValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryNameSearchValue(e.target.value);
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== 'name'),
        { id: 'name', value: e.target.value },
      ]);
    },
    [setColumnFilters],
  );

  const handleDeleteFromCategoryModal = (
    category: SerializedType<Category>,
  ) => {
    setShowDeleteAlert(true);
    setEditingCategory(category);
  };

  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success('Category deleted successfully');
      setShowDeleteAlert(false);
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const renderTable = useCallback(() => {
    if (isLoading) {
      return <div>Loading Categories...</div>;
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
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button className="flex items-center" onClick={handleAddNewClick}>
          <FiPlus className="mr-1 inline" /> <span>Add New</span>
        </Button>
      </div>
      <div className="mt-10 space-y-10">
        <Input
          value={categoryNameSearchValue}
          onChange={handleCategoryNameSearchValueChange}
          className="w-56"
          placeholder="Search Category Name"
        />
        {renderTable()}
      </div>
      {editingCategory !== null && showEditModal && (
        <EditCategoryModal
          category={editingCategory!}
          onCategoryUpdateSuccess={() => setShowEditModal(false)}
          onDeleteCategory={handleDeleteFromCategoryModal}
          onClose={() => {
            setShowEditModal(false);
          }}
        />
      )}
      {showAddModal && (
        <AddCategoryModal
          onCategoryAddSuccess={() => setShowAddModal(false)}
          onClose={() => {
            setShowAddModal(false);
          }}
        />
      )}
      {showDeleteAlert && (
        <Alert
          onConfirm={() => handleDelete(editingCategory!.id)}
          onCancel={() => setShowDeleteAlert(false)}
          confirmButtonText="Delete"
          confirmButtonClassName="bg-error-main hover:bg-error-dark"
        >
          <div className="space-y-4 p-4">
            <h3 className="text-xl font-bold">Are you absolutely sure?</h3>
            <h4 className="">
              This action will remove your category and all associated
              transactions. You <strong>cannot undo</strong> this action.
            </h4>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default CategoriesPage;
