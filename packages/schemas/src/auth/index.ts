import z from 'zod';

export const signInReqBodySchema = z
  .object({
    email: z.string().email().min(8, 'email should have at least 8 characters'),
    password: z.string().min(8, 'password should have at least 8 characters'),
  })
  .strict();

export type SignInReqBody = z.infer<typeof signInReqBodySchema>;

export const signInResBodySchema = z
  .object({
    accessToken: z.string(),
    username: z.string(),
    email: z.string().email(),
  })
  .strict();

export type SignInResBody = z.infer<typeof signInResBodySchema>;

export type SignInError = Partial<SignInReqBody>;

export const signOutReqBodySchema = z
  .object({
    email: z.string().email(),
    username: z.string(),
  })
  .strict();

export type SignOutReqBody = z.infer<typeof signOutReqBodySchema>;
