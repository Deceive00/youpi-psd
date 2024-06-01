export const formatPrice = (amount: Number) => {
  return new Intl.NumberFormat("de-DE").format(Number(amount));
};

export const calculateFakeDiscount = (amount: Number) => {
  const fakeAmount = Number(amount) + Number(amount) * 0.15;
  return formatPrice(fakeAmount);
};
