import React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {ShopLayout} from './Shop.Layout';
import swr, {useSWRPages} from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';
import {Loading} from '../components/Loading';
import {Stretch} from '../components/Stretch';
import styled from 'styled-components';
import {ShapedDiv} from '../components/ShapedDiv';
import {Img} from '../components/Img';
import {Money} from '../components/Money';
import vars from '_vars.scss';
import {Space} from '../components/Space';
import {MainButton} from '../components/button/MainButton';
import {Center} from '../components/Center';
import {Padding} from '../components/Padding';
import {Name} from '../components/Name';
import {useShop} from '../hooks/useShop';
import {AdminNav} from '../components/AdminNav';
import {Nav} from '../components/Nav';


const List = styled.div`
  padding: 16px;
  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &:empty{
    display:none;
  }
`;
const Item = styled(Link)`
  display:block; width: calc(50% - 8px); background:white; margin-bottom: 16px;
  border-radius: ${vars.borderRadius}; overflow: hidden;
  h3{padding: 0 8px;}
  p{ padding: 0 8px 8px; font-size: 18px; color: ${vars.colorDanger}; }
`;
const _Shop: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const shopId = props.match.params.id;
  const {shop, error} = useShop(shopId);
  const {
    pages: goods, loadMore, isReachingEnd, isEmpty, isLoadingMore
  } = useSWRPages<number | null, PagedResources<Good>>(
    'shops',
    ({offset, withSWR}) => {
      offset = offset || 0;
      const {data: response} = withSWR(swr(['/goods', shopId, offset + 1, 10], async (url, shopId, pageNum, pageSize) => {
        return (await defaultHttpClient.get<PagedResources<Good>>(url, {
          params: {pageNum, pageSize, shopId}, autoHandlerError: true
        })).data;
      }));

      if (!response) return <Stretch><Loading/></Stretch>;

      return response.data.map(good => (
        <Item key={good.id} to={`/shops/${shopId}/goods/${good.id}`}>
          <ShapedDiv>
            <Img src={good.imgUrl} alt=""/>
          </ShapedDiv>
          <Name>{good.name}</Name>
          <p><Money>{good.price}</Money></p>
        </Item>
      ));
    },
    (SWR, index) => {
      return SWR.data?.totalPage && SWR.data?.totalPage > 0 && SWR.data?.pageNum < SWR.data?.totalPage ?
        index + 1 :
        null;
    },
    [shopId]
  );
  return (
    <ShopLayout title="店铺详情" shop={shop} footer={<Nav/>}>
      <List>
        {goods}
      </List>
      {isEmpty ?
        <Center>
          <Space/>
          <Space/>
          店铺正在准备上架商品，敬请期待
        </Center>
        :
        <Padding>
          <Stretch>
            {isReachingEnd ?
              <Center>没有更多了</Center> :
              isLoadingMore ? null :
                <MainButton onClick={() => loadMore()}>加载更多</MainButton>
            }
          </Stretch>
        </Padding>
      }
    </ShopLayout>
  );
};

export const Shop = withRouter(_Shop);
