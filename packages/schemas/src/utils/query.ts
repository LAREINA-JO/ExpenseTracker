import { z, ZodRawShape } from 'zod';

export const conditionalQuerySchema = <
  T extends ZodRawShape,
  K extends keyof T,
>(
  schema: z.ZodObject<T>,
  allowedOrderByKeys: K[],
  maxLimit: number = 200,
) => {
  return schema
    .extend({
      limit: z.number().int().min(-1).max(maxLimit),
      start: z.number().int().min(0),
      orderBy: z.array(
        z.object(
          allowedOrderByKeys.reduce(
            (obj, key) => ({
              ...obj,
              [key]: z.enum(['asc', 'desc']).optional(),
            }),
            {} as { [key in K]: z.ZodOptional<z.ZodEnum<['asc', 'desc']>> },
          ),
        ),
      ),
    })
    .partial();
};
