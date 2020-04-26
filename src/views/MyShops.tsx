import React, {Suspense} from 'react';
import Layout from '../components/Layout';
import {defaultHttpClient} from '../lib/HttpClient';
import {Loading} from '../components/Loading';
import useSWR, {SWRConfig} from 'swr';
import {Center} from '../components/Center';
import {Space} from '../components/Space';
import Icon from '../components/Icon';
import {Img} from '../components/Img';
import {MainButton} from '../components/button/MainButton';
import westore from 'images/westore.svg';


interface PagedResources<T> {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  data: T[];
}

interface Shop {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
  ownerUserId: number;
  createdAt: string;
  updatedAt: string;
}

const Wrapper: React.FC = () => {
  const {data, error, mutate} = useSWR('/shop', (url) => {
    return defaultHttpClient.get<PagedResources<Shop>>(url, {
      params: {pageNum: 1, pageSize: 10},
      autoHandlerError: true
    });
  });
  console.log('data');
  console.log(data);
  const shops = data?.data.data; // holy shit!
  const fail = (
    <Center>
      <Space/>
      请求数据错误
      <Space/>
      <MainButton onClick={() => mutate()}>重试</MainButton>
    </Center>
  );
  return (
    <>
      {error ? fail :
        !data ? <Center>加载中...</Center> :
          shops ?
            <ol>{
              shops.map(shop => {
                return <li key={shop.id}>
                  <Img src={shop.imgUrl} fallbackSrc={westore}/>
                  <span>{shop.name}</span>
                  <Icon name="right"/>
                </li>;
              })
            }</ol> :
            <div>尚未创建店铺</div>

      }
    </>
  );
};
const MyShops: React.FC = () => {
  return (
    <SWRConfig value={{shouldRetryOnError: false}}>
      <Layout title="我的店铺">
        <Suspense fallback={<Loading/>}>
          <Wrapper/>
        </Suspense>
      </Layout>
    </SWRConfig>
  );
};

export {MyShops};
