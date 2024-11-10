export function formatCurrency(price) {
  const priceNumber = Number(price);
  return priceNumber.toLocaleString("vi-VN") + " VND";
}
