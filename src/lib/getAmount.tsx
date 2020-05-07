export const getAmount = (goods: (Good & { number: number })[]) => {
  return goods.reduce((sum, good) => {
    sum += good.price * good.number;
    return sum;
  }, 0);
};
