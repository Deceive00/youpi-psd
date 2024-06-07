import About from "@pages/about/about-page";
import AuthPage from "@pages/auth/auth-page";
import CartPage from "@pages/cart/cart-page";
import ChatPage from "@pages/chat/chat-page";
import HistoryPage from "@pages/history/history-page";
import LandingPage from "@pages/landing/landing-page";
import ManageOrderVendorPage from "@pages/manage-order/manage-order-vendor-page";
import Order from "@pages/order/order-page";
import ManageOrderSenderPage from "@pages/sender/manage-order-sender-page";
import SenderRegisterPage from "@pages/sender/register-sender";
import VendorDetailPage from "@pages/vendor-detail/vendor-detail-page";
import VendorHistoryPage from "@pages/vendor-history/vendor-history-page";
import ManageMenuPage from "@pages/vendor/manage-menu-page";
import VendorRegisterPage from "@pages/vendor/register-vendor";
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
];
