import z from 'zod';

export const getMeResBodySchema = z.object({
  email: z.string().email(),
});

export type GetMeResBody = z.infer<typeof getMeResBodySchema>;

export const getMeReqQuerySchema = getMeResBodySchema.partial();
export type GetMeReqQuery = z.infer<typeof getMeReqQuerySchema>;
