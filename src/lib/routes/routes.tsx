import About from "@pages/about/about-page";
import AuthPage from "@pages/auth/auth-page";
import CartPage from "@pages/cart/cart-page";
import ChatPage from "@pages/chat/chat-page";
import LandingPage from "@pages/landing/landing-page";
import Order from "@pages/order/order-page";
import SenderRegisterPage from "@pages/sender/register-sender";
import VendorDetailPage from "@pages/vendor-detail/vendor-detail-page";
import ManageMenuPage from "@pages/vendor/manage-menu-page";
import VendorRegisterPage from "@pages/vendor/register-vendor";
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
    path: "/auth/sender",
    element: <SenderRegisterPage />,
  },
  {
<<<<<<< HEAD
    path: '/chat', //nanti tambahin user id nya
    element: <ChatPage/>
=======
    path: "/chat", //nanti tambahin user id nya
    element: <ChatPage />,
>>>>>>> 723c5de2367f97c421a6463345a41a3512c73d6f
  },
];
