import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
const SignInPage = lazy(() => import('@/pages/AuthPages/SignInPage'));

const authRouter: RouteObject[] = [{ path: 'signin', element: <SignInPage /> }];

export default authRouter;
