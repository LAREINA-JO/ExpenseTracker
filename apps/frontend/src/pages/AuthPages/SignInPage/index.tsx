import React, { useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/assets/svg/logo.svg?react';
import { Button, Input, toast } from 'coderui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  isAPIError,
  signInReqBodySchema,
  type SignInError,
  type SignInReqBody,
} from '@expense-tracker/schemas';
import { useAppSelector } from '@/hooks/redux';
import { useSignInMutation } from '@/store/api/userApi';

type SignInPageProps = JSX.IntrinsicElements['div'];

const SignInPage: React.FC<SignInPageProps> = ({
  className,
}: SignInPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [signIn, { isLoading, isError, error }] = useSignInMutation();

  const { register, handleSubmit, formState, setError } =
    useForm<SignInReqBody>({
      resolver: zodResolver(signInReqBodySchema),
    });

  useEffect(() => {
    if (isError && isAPIError<SignInError>(error)) {
      toast.error('SignIn error!');
      const signInError = error.error;
      Object.keys(signInError).forEach((key, index) => {
        setError(
          key,
          { message: signInError[key] },
          { shouldFocus: index === 0 },
        );
      });
    }
  }, [isError, error, setError]);

  useEffect(() => {
    if (isAuthenticated) {
      const params = new URLSearchParams(location.search);
      const from = params.get('from') ?? '/';
      navigate(from);
    }
  }, [isAuthenticated]);

  const onSubmitForm = (signInReqBody: SignInReqBody) => {
    signIn(signInReqBody);
  };

  const onSubmitError = () => {
    toast.error('Login Error!');
  };

  return (
    <div
      className={twMerge(
        clsx('mx-auto flex w-96 flex-col items-center pt-32'),
        className,
      )}
    >
      <Logo className="h-20 w-20" />
      <h3 className="mt-1 text-lg text-white">Expense Tracker</h3>
      <h1 className="mt-4 text-3xl font-bold text-gray-50">
        Sign in to your account
      </h1>
      <form
        className="mt-10 self-stretch rounded-lg bg-white p-8 shadow-md"
        onSubmit={handleSubmit(onSubmitForm, onSubmitError)}
      >
        <div className="space-y-6">
          <Input
            label="Email Address"
            type="text"
            defaultValue="demo@example.com"
            {...register('email')}
            error={formState.errors['email']?.message}
          />
          <Input
            label="Password"
            type="password"
            defaultValue="demo1234"
            {...register('password')}
            error={formState.errors['password']?.message}
          />
        </div>
        <Button
          type="submit"
          className="mt-10 w-full py-3"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
