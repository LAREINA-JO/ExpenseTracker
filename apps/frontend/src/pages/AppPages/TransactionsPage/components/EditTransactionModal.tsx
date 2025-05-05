import {
  isAPIError,
  updateTransactionReqBodySchema,
  type Transaction,
  type SerializedType,
  type UpdateTransactionError,
  type UpdateTransactionReqBody,
} from '@expense-tracker/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Button, Input, Modal, Select, toast } from 'coderui';
import { IoClose } from 'react-icons/io5';
import { useForm, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useUpdateTransactionMutation } from '@/store/api/transactionsApi';
import { useGetAccountsQuery } from '@/store/api/accountsApi';
import { useGetCategoriesQuery } from '@/store/api/categoriesApi';
import DatePicker from '@/components/DatePicker';

type EditTransactionModalProps = JSX.IntrinsicElements['div'] & {
  onClose: () => void;
  transaction: SerializedType<Transaction>;
  onTransactionUpdateSuccess: () => void;
  onDeleteTransaction: (transaction: SerializedType<Transaction>) => void;
};

const schema = updateTransactionReqBodySchema;
type EditTransactionForm = UpdateTransactionReqBody;

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  className,
  onClose,
  transaction,
  onTransactionUpdateSuccess,
  onDeleteTransaction,
}: EditTransactionModalProps) => {
  const [updateTransaction, { isLoading }] = useUpdateTransactionMutation();
  const { data: accounts = [] } = useGetAccountsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<EditTransactionForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: transaction.amount,
      description: transaction.description,
      transactionDate: transaction.transactionDate,
      accountId: transaction.accountId,
      categoryId: transaction.categoryId,
    },
  });

  const onSubmit = async (data: EditTransactionForm) => {
    try {
      await updateTransaction({ ...data, id: transaction.id }).unwrap();
      toast.success('Transaction updated successfully');
      onTransactionUpdateSuccess();
    } catch (error) {
      if (isAPIError<UpdateTransactionError>(error)) {
        const updateError = error.error;
        Object.keys(updateError).forEach((key) => {
          setError(key as keyof EditTransactionForm, {
            message: updateError[key as keyof UpdateTransactionError],
          });
        });
      }
      toast.error('Failed to update transaction');
    }
  };

  return (
    <Modal triggerMode="manual" onClose={onClose} className="p-8">
      <div
        className={twMerge(clsx('w-[400px] rounded-lg bg-white'), className)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Edit Transaction</h3>
          <button onClick={onClose}>
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col items-stretch space-y-6"
        >
          <Controller
            name="transactionDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                date={new Date(field.value!)}
                onSelectDate={(date) => field.onChange(date.toISOString())}
                triggerButtonClassName="text-gray-500"
                dayPickerRootClassName="bg-slate-100"
                error={errors.transactionDate?.message}
              />
            )}
          />

          <Controller
            name="accountId"
            control={control}
            render={({ field }) => (
              <Select
                label="Account"
                initialValue={String(field.value)}
                onSelectOption={(option) =>
                  field.onChange(Number(option.value))
                }
                error={errors.accountId?.message}
                options={accounts.map((account) => ({
                  label: account.name,
                  value: String(account.id),
                }))}
              />
            )}
          />

          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                label="Category"
                initialValue={String(field.value)}
                onSelectOption={(option) =>
                  field.onChange(Number(option.value))
                }
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  label: category.name,
                  value: String(category.id),
                }))}
              />
            )}
          />

          <Input
            label="Amount"
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
            error={errors.amount?.message}
          />

          <Input
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />

          <div className="!mt-10 flex justify-between">
            <Button
              type="button"
              className="bg-error-main hover:bg-error-dark"
              onClick={() => onDeleteTransaction(transaction)}
            >
              Delete
            </Button>
            <div className="space-x-4">
              <Button
                type="button"
                className="bg-neutral-200 text-gray-700 hover:bg-neutral-300"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditTransactionModal;
