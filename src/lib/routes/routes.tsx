import About from '@pages/about/about';
import AuthPage from '@pages/auth/auth-page';
import LandingPage from '@pages/landing/landing-page';
import Order from '@pages/order/order';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/about',
    element: <About/>
  }
]);
