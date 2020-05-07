import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';

export const useShop = (id: string | number) => {

  const {data: shop, mutate, error} = useSWR(`/shop/${id}`, async (key) => {
    const response = await defaultHttpClient.get<Resource<Shop>>(key, {
      autoHandlerError: true
    });
    return response.data.data;
  });

  return {shop, mutate, error};
};
