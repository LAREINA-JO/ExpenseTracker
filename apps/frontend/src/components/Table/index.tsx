import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  flexRender,
  type SortDirection,
  type Table as TableType,
} from '@tanstack/react-table';

type TableProps<T> = JSX.IntrinsicElements['div'] & {
  table: TableType<T>;
  headerTrClassName?: string;
  headerThClassName?: string;
  bodyTrClassName?: string;
  bodyTdClassName?: string;
};

const Table = <T,>({
  className,
  table,
  headerThClassName,
  headerTrClassName,
  bodyTdClassName,
  bodyTrClassName,
}: TableProps<T>) => {
  return (
    <div className={twMerge(clsx('space-y-4 p-4'))}>
      <table
        className={twMerge(clsx('border-spacing-0 border shadow'), className)}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className={twMerge(clsx('text-left', headerTrClassName))}
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={twMerge(
                    clsx(
                      'p-2',
                      {
                        'cursor-pointer': header.column.getCanSort(),
                      },
                      headerThClassName,
                    ),
                  )}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}

                  {/* sorting */}
                  <div className="ml-4 inline-block w-5">
                    {header.column.getCanSort() &&
                      header.column.getIsSorted() !== false && (
                        <button
                          className="px-2 text-right"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {
                            { asc: '↑', desc: '↓' }[
                              header.column.getIsSorted() as SortDirection
                            ]
                          }
                        </button>
                      )}
                    {header.column.getCanSort() &&
                      header.column.getIsSorted() === false && (
                        <button
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-1 text-right"
                        >
                          ↑↓
                        </button>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={table.getVisibleLeafColumns().length}>
                <div className="px-8 py-4 text-center text-xl">
                  No data found in the select period
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={twMerge(clsx('border-b', bodyTrClassName))}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={twMerge(clsx('p-1', bodyTdClassName))}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* paging nation */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>{' '}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Table;
