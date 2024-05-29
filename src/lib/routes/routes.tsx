import About from '@pages/about/about';
import AuthPage from '@pages/auth/auth-page';
import LandingPage from '@pages/landing/landing-page';
import Order from '@pages/order/order-page';
import VendorDetailPage from '@pages/vendor-detail/vendor-detail-page';
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
  },
  {
    path: '/vendor/:campusId/:vendorId',
    element: <VendorDetailPage/>
  }
]);
