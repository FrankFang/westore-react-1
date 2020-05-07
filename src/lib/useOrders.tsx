import swr, {useSWRPages} from 'swr';
import {defaultHttpClient} from './HttpClient';
import {Stretch} from '../components/Stretch';
import {Loading} from '../components/Loading';
import React, {ReactNode} from 'react';

interface OrderItemRender {
  (order: Order): ReactNode
}

export const useOrders = (render: OrderItemRender) => {
  return useSWRPages<number | null, PagedResources<Order>>(
    'orders',
    ({offset, withSWR}) => {
      offset = offset || 0;
      const {data: response} = withSWR(swr(['/order', offset + 1, 10], async (url, pageNum, pageSize) => {
        return (await defaultHttpClient.get<PagedResources<Order>>(url, {
          params: {pageNum, pageSize}, autoHandlerError: true
        })).data;
      }));

      if (!response) return <Stretch><Loading/></Stretch>;

      return response.data.map(order =>
        render(order)
      );
    },
    (SWR, index) => {
      return SWR.data?.totalPage && SWR.data?.totalPage > 0 && SWR.data?.pageNum < SWR.data?.totalPage ?
        index + 1 :
        null;
    },
    []
  );
};
