import { Menu } from "@lib/types/vendor-types";

export const formatPrice = (amount: Number) => {
  return new Intl.NumberFormat("de-DE").format(Number(amount));
};

export const calculateFakeDiscount = (amount: Number) => {
  const fakeAmount = Number(amount) + Number(amount) * 0.15;
  return formatPrice(fakeAmount);
};

export const getTotalPriceMenu = (menus: Menu[]) => {
  let price: number = 0;
  menus.forEach((menu: Menu) => {
    price += Number(menu.price) * Number(menu.quantity);
  });
  return price;
};

export const getPricePerMenu = (menu: Menu) => {
  return Number(menu.price) * Number(menu.quantity);
};
