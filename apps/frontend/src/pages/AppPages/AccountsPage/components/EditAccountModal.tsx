import {
  isAPIError,
  updateAccountsReqBodySchema,
  type Account,
  type SerializedType,
  type UpdateAccountError,
} from '@expense-tracker/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Button, Input, Modal, toast } from 'coderui';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { useUpdateAccountMutation } from '@/store/api/accountsApi';

type EditAccountModalProps = JSX.IntrinsicElements['div'] & {
  onClose: () => void;
  account: SerializedType<Account>;
  onAccountUpdateSuccess: () => void;
  onDeleteAccount: (account: SerializedType<Account>) => void;
};

const schema = updateAccountsReqBodySchema.pick({
  name: true,
  cardNumber: true,
});

type EditAccountForm = z.infer<typeof schema>;

const EditAccountModal = ({
  account,
  className,
  children,
  onClose,
  onAccountUpdateSuccess,
  onDeleteAccount,
  ...restProps
}: EditAccountModalProps) => {
  const { register, handleSubmit, setError, formState } =
    useForm<EditAccountForm>({
      resolver: zodResolver(schema),
      defaultValues: {
        name: account.name,
        cardNumber: account.cardNumber,
      },
    });

  const [updateAccount, { isLoading: isUpdateLoading }] =
    useUpdateAccountMutation();

  const onSubmit = async (data: EditAccountForm) => {
    try {
      await updateAccount({
        id: account.id,
        ...data,
      }).unwrap();
      toast.success('Account updated successfully');
      onAccountUpdateSuccess();
    } catch (error) {
      toast.error('Failed to update account');
      if (isAPIError<UpdateAccountError>(error)) {
        const updateError = error.error;
        Object.keys(updateError).forEach((key, index) => {
          setError(
            key,
            { message: updateError[key] },
            { shouldFocus: index === 0 },
          );
        });
      }
    }
  };

  return (
    <>
      <Modal
        onClose={onClose}
        triggerMode="manual"
        className={twMerge(clsx('relative p-8'), className)}
        {...restProps}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600"
          type="button"
        >
          <IoClose size={24} />
        </button>

        <div>
          <h2 className="text-xl font-bold">Edit Account</h2>
          <h4 className="mt-2 text-sm text-neutral-400">
            Edit an existing account
          </h4>
        </div>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Account Name"
            className="w-96"
            labelClassName="font-bold text-sm text-neutral-700 mb-2"
            error={formState.errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Account Name"
            className="w-96"
            labelClassName="font-bold text-sm text-neutral-700 mb-2"
            error={formState.errors.cardNumber?.message}
            {...register('cardNumber')}
          />
          <div className="mt-6 flex flex-col space-y-4">
            <Button type="submit" isLoading={isUpdateLoading}>
              Save changes
            </Button>
            <Button
              type="button"
              className="bg-error-main hover:bg-error-dark"
              isLoading={isUpdateLoading}
              onClick={() => onDeleteAccount(account)}
            >
              Delete Account
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditAccountModal;
