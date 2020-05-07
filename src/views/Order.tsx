import React from 'react';
import Layout from '../components/Layout';
import {Panel} from '../components/Panel';
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import {ShapedDiv} from '../components/ShapedDiv';
import {Img} from '../components/Img';
import {Name} from '../components/Name';
import {Money} from '../components/Money';
import {getAmount} from '../lib/getAmount';
import {MainButton} from '../components/button/MainButton';
import {useOrder} from '../hooks/useOrder';
import {Loading} from '../components/Loading';
import {GoodsList} from '../components/GoodsList';
import {OrderItem} from '../components/OrderItem';
import styled from 'styled-components';
import {orderStatusMap} from '../maps/OrderStatus';
import {F} from '../components/Form';
import {Space} from '../components/Space';
import {Stretch} from '../components/Stretch';

const Amount = styled.span`
  flex-grow: 1;
`;
const Footer = styled.footer`
  .order{
    flex-grow: 0;
  }
`;
const _Order: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const orderId = props.match.params.id;
  // const {data: order, error} = useOrder(orderId);
  const order: Order = {
    'id': 3,
    'totalPrice': 100,
    'address': '1111',
    'expressCompany': null,
    'expressId': null,
    'status': 'pending',
    'createdAt': '2020-05-07T13:42:46.000+0000',
    'shop': {
      'id': 91,
      'name': '新的店铺2',
      'description': '2222',
      'imgUrl': '',
      'ownerUserId': 84,
      'createdAt': '2020-05-07T13:42:38.000+0000',
      'updatedAt': '2020-05-07T13:42:38.000+0000'
    },
    'goods': [{
      'id': 88,
      'shopId': 91,
      'name': '111111111111',
      'description': '',
      'imgUrl': '',
      'price': 100,
      'stock': 106,
      'createdAt': '2020-05-07T13:42:46.000+0000',
      'updatedAt': '2020-05-07T13:42:46.000+0000',
      'number': 1
    }]
  };
  if (!order) {return <Loading/>;}
  const {shop, goods} = order;
  return (
    <Layout title="订单详情">
      <Panel>
        <h2><Link to={`/shops/${shop.id}`}>{shop.name}</Link></h2>
        <GoodsList>
          {goods.map(g => <OrderItem key={g.id}>
            <div className="cover">
              <ShapedDiv>
                <Img src={g.imgUrl}/>
              </ShapedDiv>
            </div>
            <div className="text">
              <Name>{g.name}</Name>
              <p><Money className="money">{g.price}</Money></p>
            </div>
          </OrderItem>)}
        </GoodsList>
        <Footer>
          <Amount>
            总计：<Money>{getAmount(goods)}</Money>
          </Amount>
          {order.status === 'pending' ?
            <Link to={`/orders/${orderId}/pay`}><MainButton className="order">去支付</MainButton></Link>
            :
            <span>{orderStatusMap[order.status]}</span>
          }
        </Footer>
      </Panel>

      <F title="收件人" defaultData={order} fields={[
        {key: 'address', input: {type: 'text', label: '收件地址', readOnly: true}},
      ]}>
      </F>

      <F title="物流信息" defaultData={order} fields={[
        {key: 'expressCompany', input: {label: '物流公司', readOnly: true, placeholder: '空'}},
        {key: 'expressId', input: {label: '物流单号', readOnly: true, placeholder: '空'}},
      ]}>
      </F>
    </Layout>
  );
};

export const Order = withRouter(_Order);
