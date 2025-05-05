import axios, { AxiosError } from 'axios';
import store from '@/store';
import { toast } from 'coderui';
import { updateIsAuthenticated } from '@/store/slice/userSlice';
import userApi from '@/store/api/userApi';

const axiosApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true,
});

axiosApi.interceptors.request.use((request) => {
  const accessToken = store.getState().user.accessToken;
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      if (status !== undefined && status >= 500) {
        toast.error('Something went wrong, please try again');
        return;
      }

      if (status === 401) {
        // unauthenticated, try refresh and then retry the request
        if (!store.getState().user.isAuthenticated) {
          store.dispatch(updateIsAuthenticated(false));
          return Promise.reject(err);
        }

        if (err.config?.url?.startsWith('/auth/')) {
          const reject = Promise.reject(err);
          store.dispatch(updateIsAuthenticated(false));
          return reject;
        }

        try {
          await store
            .dispatch(userApi.endpoints.refreshUser.initiate())
            .unwrap();
          if (err.config) {
            return axiosApi(err.config);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (status === 400) {
        return Promise.reject(err.response?.data);
      }
    }
    return Promise.reject(err);
  },
);

export default axiosApi;
