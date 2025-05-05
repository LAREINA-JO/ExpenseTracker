import {
  addTransactionReqBodySchema,
  isAPIError,
  type AddTransactionError,
  type AddTransactionReqBody,
} from '@expense-tracker/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Button, Input, Modal, Select, toast } from 'coderui';
import { useForm, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useAddTransactionMutation } from '@/store/api/transactionsApi';
import { IoClose } from 'react-icons/io5';
import { useGetAccountsQuery } from '@/store/api/accountsApi';
import { useGetCategoriesQuery } from '@/store/api/categoriesApi';
import dayjs from 'dayjs';
import DatePicker from '@/components/DatePicker';

type AddTransactionModalProps = JSX.IntrinsicElements['div'] & {
  onClose: () => void;
  onTransactionAddSuccess: () => void;
};

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  className,
  onClose,
  onTransactionAddSuccess,
}: AddTransactionModalProps) => {
  const [addTransaction, { isLoading }] = useAddTransactionMutation();
  const { data: accounts = [] } = useGetAccountsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<AddTransactionReqBody>({
    resolver: zodResolver(addTransactionReqBodySchema),
    defaultValues: {
      transactionDate: dayjs().toISOString(),
    },
  });

  const onSubmit = async (data: AddTransactionReqBody) => {
    try {
      await addTransaction(data).unwrap();
      toast.success('Transaction added successfully');
      onTransactionAddSuccess();
    } catch (error) {
      if (isAPIError<AddTransactionError>(error)) {
        const addError = error.error;
        Object.keys(addError).forEach((key) => {
          setError(key as keyof AddTransactionReqBody, {
            message: addError[key as keyof AddTransactionError],
          });
        });
      }
      toast.error('Failed to add transaction');
    }
  };

  return (
    <Modal triggerMode="manual" onClose={onClose} className="p-8">
      <div
        className={twMerge(clsx('w-[400px] rounded-lg bg-white'), className)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Add New Transaction</h3>
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
              <label>
                <span className="test-label inline-block text-gray-500">
                  Transaction Date
                </span>
                <DatePicker
                  date={dayjs(field.value).toDate()}
                  onSelectDate={(date) => field.onChange(date.toISOString())}
                  triggerButtonClassName="text-gray-500"
                  dayPickerRootClassName="bg-slate-100"
                  error={errors.transactionDate?.message}
                />
              </label>
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

          <div className="!mt-10 flex justify-end space-x-4">
            <Button
              type="button"
              className="bg-neutral-200 text-gray-700 hover:bg-neutral-300"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Add
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;
