// utils/compute.js
export const computeLineTotal = (item) => {
  const qty = Number(item.quantity || 0);
  const price = Number(item.unitPrice || 0);
  return Math.round((qty * price + Number.EPSILON) * 100) / 100;
};

export const computeOrderTotal = (items = []) => {
  return items.reduce((s, it) => s + computeLineTotal(it), 0);
};