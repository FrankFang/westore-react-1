import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Wrapper} from './Shop.Wrapper';
import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';
import {Loading} from '../components/Loading';

const _Shop: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const {data: shop, mutate} = useSWR(`/shop/${props.match.params.id}`, async (key) => {
    const response = await defaultHttpClient.get<Resource<Shop>>(key, {autoHandlerError: true});
    return response.data.data;
  });
  if (!shop) {return <Loading/>;}
  return (
    <Wrapper shop={shop}>
      hi
    </Wrapper>
  );
};

export const Shop = withRouter(_Shop);
