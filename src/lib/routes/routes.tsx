import About from "@pages/front-ends/about-page";
import AuthPage from "@pages/authentication/auth-page";
import CartPage from "@pages/cart-management/cart-page";
import ChatPage from "@pages/chat-management/chat-page";
import HistoryPage from "@pages/history-management/history-page";
import LandingPage from "@pages/front-ends/landing/landing-page";
import ManageOrderVendorPage from "@pages/vendor-management/manage-order-vendor-page";
import OrderDetail from "@pages/ordering/order-detail-page";
import Order from "@pages/ordering/order-page";
import ProfilePage from "@pages/profile-management/profile-page";
import SenderHistoryPage from "@pages/history-management/sender-history-page";
import ManageOrderSenderPage from "@pages/sender-order-management/manage-order-sender-page";
import SenderRegisterPage from "@pages/authentication/register-sender";
import VendorDetailPage from "@pages/vendor-management/vendor-detail-page";
import VendorHistoryPage from "@pages/history-management/vendor-history-page";
import ManageMenuPage from "@pages/vendor-management/manage-menu-page";
import VendorRegisterPage from "@pages/vendor-management/register-vendor";
import SenderLayout from "src/layout/sender-layout";
import VendorLayout from "src/layout/vendor-layout";

export const router = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/vendor/:campusId/:vendorId",
    element: <VendorDetailPage />,
  },
  {
    path: "/auth/vendor",
    element: <VendorRegisterPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/vendor/manage/menu",
    element: <ManageMenuPage />,
  },
  {
    path: "/vendor/manage/order",
    element: <ManageOrderVendorPage />,
  },
  {
    path: "/vendor/history",
    element: <VendorHistoryPage />,
  },
  {
    path: "/sender/history",
    element: <SenderHistoryPage />,
  },
  {
    path: "/vendor/",
    element: (
      <VendorLayout
        children={<></>}
        menuName="Vendor Dashboard"
        menuDescription="Here you can manage your vendor account"
      />
    ),
  },
  {
    path: "/sender/manage/order",
    element: <ManageOrderSenderPage />,
  },
  {
    path: "/sender/",
    element: (
      <SenderLayout
        children={<></>}
        menuName="Sender Dashboard"
        menuDescription="Here you can manage your sender account"
      />
    ),
  },
  {
    path: "/auth/sender",
    element: <SenderRegisterPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/order/detail",
    element: <OrderDetail />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];
