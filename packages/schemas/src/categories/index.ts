import { z } from 'zod';
import { conditionalQuerySchema } from '../utils/query';
import { APIResBody } from '../utils/api';

// Base category schema
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z
    .string()
    .datetime()
    .transform((val) => new Date(val)),
});

export type Category = z.infer<typeof categorySchema>;

// Category input validation
export const categoryInputSchema = z.object({
  name: z
    .string()
    .min(3, 'category name should not be less than 3 characters')
    .max(50, 'category name should be less than 50 characters'),
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;
export type CategoryInputError = Partial<Record<keyof CategoryInput, string>>;

// Get categories
export const getCategoriesReqBodySchema = conditionalQuerySchema(
  categorySchema,
  ['id', 'createdAt'],
);
export type GetCategoriesReqBody = z.infer<typeof getCategoriesReqBodySchema>;

export const getCategoriesResBodySchema = z.array(categorySchema);
export type GetCategoriesResBody = APIResBody<
  typeof getCategoriesResBodySchema
>;

// Update category
export const updateCategoriesReqBodySchema = categoryInputSchema.partial();
export type UpdateCategoriesReqBody = z.infer<
  typeof updateCategoriesReqBodySchema
>;
export type UpdateCategoryError = CategoryInputError;

// Add category
export const addCategoryReqBodySchema = categoryInputSchema;
export type AddCategoryReqBody = z.infer<typeof addCategoryReqBodySchema>;
export type AddCategoryError = CategoryInputError;
