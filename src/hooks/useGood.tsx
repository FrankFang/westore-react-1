import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';

export const useGood = (id: string | number) => {

  const {data: good, mutate} = useSWR(`/goods/${id}`, async (key) => {
    const response = await defaultHttpClient.get<Resource<Good>>(key, {autoHandlerError: true});
    return response.data.data;
  });

  return {good, mutate};
};
