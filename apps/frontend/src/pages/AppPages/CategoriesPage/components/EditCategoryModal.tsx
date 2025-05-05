import {
  isAPIError,
  updateCategoriesReqBodySchema,
  type Category,
  type SerializedType,
  type UpdateCategoryError,
} from '@expense-tracker/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Button, Input, Modal, toast } from 'coderui';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { useUpdateCategoryMutation } from '@/store/api/categoriesApi';

type EditCategoryModalProps = JSX.IntrinsicElements['div'] & {
  onClose: () => void;
  category: SerializedType<Category>;
  onCategoryUpdateSuccess: () => void;
  onDeleteCategory: (category: SerializedType<Category>) => void;
};

const schema = updateCategoriesReqBodySchema.pick({
  name: true,
});

type EditCategoryForm = z.infer<typeof schema>;

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  className,
  onClose,
  category,
  onCategoryUpdateSuccess,
  onDeleteCategory,
}: EditCategoryModalProps) => {
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<EditCategoryForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category.name,
    },
  });

  const onSubmit = async (data: EditCategoryForm) => {
    try {
      await updateCategory({ ...data, id: category.id }).unwrap();
      toast.success('Category updated successfully');
      onCategoryUpdateSuccess();
    } catch (error) {
      if (isAPIError<UpdateCategoryError>(error)) {
        const { error: updateError } = error;
        Object.keys(updateError).forEach((key) => {
          setError(key as keyof EditCategoryForm, {
            message: updateError[key],
          });
        });
      }
      toast.error('Failed to update category');
    }
  };

  return (
    <Modal triggerMode="manual" onClose={onClose} className="p-8">
      <div
        className={twMerge(clsx('w-[400px] rounded-lg bg-white'), className)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Edit Category</h3>
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

          <div className="flex justify-between">
            <Button
              type="button"
              className="bg-error-main hover:bg-error-dark"
              onClick={() => onDeleteCategory(category)}
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

export default EditCategoryModal;
