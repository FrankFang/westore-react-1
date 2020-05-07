export const orderStatusMap: { [K in OrderStatus]: string } = {
  'pending': '未支付',
  'paid': '已支付',
  'delivered': '已发货',
  'received': '已收货'
};
