import { redirect, type LoaderFunction } from 'react-router-dom';
import store from '@/store';
import userApi from '@/store/api/userApi';
import { toast } from 'coderui';

const AuthRequiredLoader: LoaderFunction = async ({ request }) => {
  const isAuthenticated = store.getState().user.isAuthenticated;
  if (isAuthenticated) {
    return null;
  }

  try {
    await store.dispatch(userApi.endpoints.refreshUser.initiate()).unwrap();
    return null;
  } catch (error) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    toast.error('Sign in required!');
    return redirect(`/auth/signin?${params.toString()}`);
  }
};

export default AuthRequiredLoader;
