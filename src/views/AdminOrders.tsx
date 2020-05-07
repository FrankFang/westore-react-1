import React from 'react';
import {useOrders} from '../lib/useOrders';
import Layout from '../components/Layout';
import styled from 'styled-components';
import {getAmount} from '../lib/getAmount';
import {Money} from 'components/Money';
import {orderStatusMap} from '../maps/OrderStatus';
import vars from '_vars.scss';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';
import {Center} from '../components/Center';
import {Space} from '../components/Space';
import {MainButton} from '../components/button/MainButton';
import {history} from '../lib/history';
import {Padding} from '../components/Padding';
import {Stretch} from '../components/Stretch';
import { AdminNav } from 'components/AdminNav';

const Item = styled(Link)`
  height: ${vars.heightItem}; 
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;
const List = styled.div`
  background:white;
`;
const Status = styled.span`
  margin-left: auto;
  margin-right: 16px;
`;
export const AdminOrders: React.FC = () => {
  const {pages: orders, isEmpty, isReachingEnd, loadMore, isLoadingMore} = useOrders(order => (
    <Item to={`/admin/orders/${order.id}`}>
      <Money>{getAmount(order.goods)}</Money>
      <Status>{orderStatusMap[order.status]}</Status>
      <Icon name="right"/>
    </Item>
  ));
  return (
    <Layout title="我的订单" hasBack={false} footer={<AdminNav/>}>
      <List>
        {orders}
      </List>
      {isEmpty ?
        <Center>
          <Space/>没有订单<Space/>
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
    </Layout>
  );
};
