import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';

export const useOrder = (id: number | string) => {
  return useSWR(['/order', id], async (url, id) => {
    return (await defaultHttpClient.get<Resource<Order>>(`${url}/${id}`, {
      autoHandlerError: true
    })).data.data;
  });
};
