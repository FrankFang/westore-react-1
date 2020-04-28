import React from 'react';
import useSWR, {useSWRPages} from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';
import {Center} from '../components/Center';
import {Space} from '../components/Space';
import {MainButton} from '../components/button/MainButton';
import {Item} from './MyShops.styled';
import {Link} from 'react-router-dom';
import {Img} from '../components/Img';
import westore from '../images/westore.svg';
import Icon from '../components/Icon';
import {AxiosResponse} from 'axios';
import {Loading} from '../components/Loading';
import {Stretch} from '../components/Stretch';
import styled from 'styled-components';

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

const List = styled.div`
  background: white;
`;
const Padding = styled.div`
  padding: 16px;
`

export const Wrapper: React.FC = () => {
  console.log('----------------wrapper---------------');
  const {pages, loadMore, isReachingEnd, isEmpty, isLoadingMore} = useSWRPages<number, AxiosResponse<PagedResources<Shop>>>(
    'shop-list',
    ({offset, withSWR}) => {
      offset = offset || 0;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {data: response} = withSWR(useSWR(`/shop?pageNum=${offset + 1}`, (key) => {
        return defaultHttpClient.get<PagedResources<Shop>>(key, {
          params: {pageSize: 10},
          autoHandlerError: true
        });
      }));

      if (!response) return <Stretch><Loading/></Stretch>;

      return response.data.data.map(shop => (
        <Item key={shop.id}>
          <Link to={`/shops/${shop.id}`}>
            <Img src={shop.imgUrl} fallbackSrc={westore}/>
            <span className="name oneLine">{shop.name}</span>
            <Icon name="right"/>
          </Link>
        </Item>
      ));
    },
    // @ts-ignore
    (SWR, index) => {
      console.log('index');
      console.log(index);
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
  //   mutate(data);
  // };
  return (
    <>
      {isEmpty ? <>
        <Center>
          <Space/>
          尚未创建店铺
          <Space/>
          <MainButton>创建新的店铺</MainButton>
          <Space/>
        </Center>
      </> : <>
        <List>
          {pages}
        </List>
        <Padding>
          <Stretch>
            {isReachingEnd ?
              <Center>没有更多了</Center> :
              isLoadingMore ? null :
                <MainButton onClick={() => loadMore()}>加载更多</MainButton>
            }
          </Stretch>
        </Padding>
      </>}

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

      {/*}*/}
    </>
  );
};
