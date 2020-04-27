import React from 'react';
import useSWR, {useSWRPages} from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';
import {Center} from '../components/Center';
import {Space} from '../components/Space';
import {MainButton} from '../components/button/MainButton';
import {ListPanel} from './MyShops.styled';
import {Link} from 'react-router-dom';
import {Img} from '../components/Img';
import westore from '../images/westore.svg';
import Icon from '../components/Icon';
import {AxiosResponse} from 'axios';

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

export const Wrapper: React.FC = () => {
  console.log('run');
  const {pages, isLoadingMore, loadMore, isReachingEnd, isEmpty} = useSWRPages<number, AxiosResponse<PagedResources<Shop>>>(
    'shop-list',
    ({offset, withSWR}) => {
      offset = offset || 1;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {data, error} = withSWR(useSWR('shop-list', () => {
        return defaultHttpClient.get<PagedResources<Shop>>('/shop', {
          params: {pageNum: offset, pageSize: 10},
          autoHandlerError: true
        });
      }));

      if (!data) return null;

      return data.data.data.map(result => (
        <div>{result.name}</div>
      ));
    },
    // @ts-ignore
    (SWR, index) => {
      console.log('hi');
      return SWR.data?.data?.totalPage &&
      SWR.data?.data?.totalPage > 0 && SWR.data?.data.pageNum < SWR.data?.data.totalPage ? index + 1 : null;
    },
    []
  );
  // const {data, error, mutate} = useSWR('/shop', (url) => {
  //   return defaultHttpClient.get<PagedResources<Shop>>(url, {
  //     params: {pageNum: 1, pageSize: 10},
  //     autoHandlerError: true
  //   });
  // });
  // console.log('data');
  // console.log(data);
  // const shops = data?.data.data; // holy shit!
  // const fail = (
  //   <Center>
  //     <Space/>
  //     请求数据错误
  //     <Space/>
  //     <MainButton onClick={() => mutate()}>重试</MainButton>
  //   </Center>
  // );
  // const loadMore = async () => {
  //   const data = await defaultHttpClient.get<PagedResources<Shop>>('/shop', {
  //     params: {pageNum: 2, pageSize: 10},
  //     autoHandlerError: true
  //   });
  //   console.log('data.data.data');
  //   console.log(data.data.data);
  //   mutate(data);
  // };
  return (
    <>
      {pages}
      {isReachingEnd ?
        <div>没了</div>
        :
        <MainButton onClick={() => loadMore()}>加载更多</MainButton>
      }
      {/*{error ? fail :*/}
      {/*  !data ? <Center>加载中...</Center> :*/}
      {/*    shops ? <>*/}
      {/*        <ListPanel>*/}
      {/*          <ol>{*/}
      {/*            shops.map(shop => {*/}
      {/*              return <li key={shop.id}>*/}
      {/*                <Link to={`/shops/${shop.id}`}>*/}
      {/*                  <Img src={shop.imgUrl} fallbackSrc={westore}/>*/}
      {/*                  <span className="name oneLine">{shop.name}</span>*/}
      {/*                  <Icon name="right"/>*/}
      {/*                </Link>*/}
      {/*              </li>;*/}
      {/*            })*/}
      {/*          }</ol>*/}
      {/*          <Center>*/}
      {/*            <Space/>*/}
      {/*            <MainButton onClick={loadMore}>加载更多</MainButton>*/}
      {/*          </Center>*/}
      {/*        </ListPanel>*/}
      {/*      </> :*/}
      {/*      <Center>*/}
      {/*        <Space/>*/}
      {/*        尚未创建店铺*/}
      {/*        <Space/>*/}
      {/*        <MainButton>创建新的店铺</MainButton>*/}
      {/*        <Space/>*/}
      {/*      </Center>*/}

      {/*}*/}
    </>
  );
};
