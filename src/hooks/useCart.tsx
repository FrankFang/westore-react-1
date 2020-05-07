import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';

export const useCart = () => {
  const {data: cart, error, mutate, isValidating} = useSWR('/shoppingCart', async (url) => {
    return (await defaultHttpClient.get<PagedResources<Cart>>(url, {
      params: {pageSize: 100, pageNum: 1},
      autoHandlerError: true
    })).data.data;
  });
  const updateShopCart = (shopId: number, shop: Shop, goods: (Good & { number: number })[]) => {
    if (!cart) {return;}
    const index = cart.findIndex(({shop}) => shop.id === shopId);
    mutate([...cart.slice(0, index), {shop, goods}, ...cart.slice(index)]);
  };
  return {
    cart, error, updateShopCart, isValidating
  };
};
