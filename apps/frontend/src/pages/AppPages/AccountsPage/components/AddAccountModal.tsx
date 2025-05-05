import {
  addAccountReqBodySchema,
  isAPIError,
  type AddAccountError,
  type AddAccountReqBody,
} from '@expense-tracker/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Button, Input, Modal, toast } from 'coderui';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useAddAccountMutation } from '@/store/api/accountsApi';
import { IoClose } from 'react-icons/io5';

type AddAccountModalProps = JSX.IntrinsicElements['div'] & {
  onClose: () => void;
  onAccountAddSuccess: () => void;
};

const AddAccountModal = ({
  className,
  onClose,
  onAccountAddSuccess,
  ...restProps
}: AddAccountModalProps) => {
  const { register, handleSubmit, formState, setError } =
    useForm<AddAccountReqBody>({
      resolver: zodResolver(addAccountReqBodySchema),
    });

  const [addAccount, { isLoading }] = useAddAccountMutation();

  const onSubmit = async (data: AddAccountReqBody) => {
    try {
      await addAccount(data).unwrap();
      toast.success('Account added successfully');
      onAccountAddSuccess();
    } catch (error) {
      toast.error('Failed to add account');
      if (isAPIError<AddAccountError>(error)) {
        const addAccountError = error.error;
        Object.keys(addAccountError).forEach((key, index) => {
          setError(
            key,
            { message: addAccountError[key] },
            { shouldFocus: index === 0 },
          );
        });
      }
    }
  };

  return (
    <Modal
      onClose={onClose}
      triggerMode="manual"
      className={twMerge(clsx('relative p-8'), className)}
      {...restProps}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-neutral-400 transition-colors hover:text-neutral-600"
      >
        <IoClose size={24} />
      </button>
      <div>
        <h2 className="text-xl font-bold">Add Account</h2>
        <h4 className="mt-2 text-sm text-neutral-400">Add a new account</h4>
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
          label="Card Number"
          className="mt-4 w-96"
          labelClassName="font-bold text-sm text-neutral-700 mb-2"
          error={formState.errors.cardNumber?.message}
          {...register('cardNumber')}
        />
        <div className="mt-6 flex flex-col space-y-4">
          <Button type="submit" isLoading={isLoading}>
            Add new account
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAccountModal;
