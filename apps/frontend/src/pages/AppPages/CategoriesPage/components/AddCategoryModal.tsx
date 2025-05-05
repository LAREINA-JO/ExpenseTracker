import {
  addCategoryReqBodySchema,
  isAPIError,
  type AddCategoryError,
  type AddCategoryReqBody,
} from '@expense-tracker/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Button, Input, Modal, toast } from 'coderui';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useAddCategoryMutation } from '@/store/api/categoriesApi';
import { IoClose } from 'react-icons/io5';

type AddCategoryModalProps = JSX.IntrinsicElements['div'] & {
  onClose: () => void;
  onCategoryAddSuccess: () => void;
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  className,
  onClose,
  onCategoryAddSuccess,
}: AddCategoryModalProps) => {
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AddCategoryReqBody>({
    resolver: zodResolver(addCategoryReqBodySchema),
  });

  const onSubmit = async (data: AddCategoryReqBody) => {
    try {
      await addCategory(data).unwrap();
      toast.success('Category added successfully');
      onCategoryAddSuccess();
    } catch (error) {
      if (isAPIError<AddCategoryError>(error)) {
        const addError = error.error;
        Object.keys(addError).forEach((key) => {
          setError(key as keyof AddCategoryReqBody, {
            message: addError[key as keyof AddCategoryError],
          });
        });
      }
      toast.error('Failed to add category');
    }
  };

  return (
    <Modal triggerMode="manual" onClose={onClose} className="p-8">
      <div
        className={twMerge(clsx('w-[400px] rounded-lg bg-white'), className)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Add New Category</h3>
          <button onClick={onClose}>
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <Input
            label="Category Name"
            {...register('name')}
            error={errors.name?.message}
          />

          <div className="flex justify-end space-x-4">
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

export default AddCategoryModal;
