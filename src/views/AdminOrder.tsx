import React from 'react';
import Layout from '../components/Layout';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {F, Form, FormRow} from '../components/Form';
import day from 'dayjs';
import {orderStatusMap} from '../maps/OrderStatus';
import {MainButton} from '../components/button/MainButton';
import {Stretch} from '../components/Stretch';
import {Space} from '../components/Space';
import {defaultHttpClient} from '../lib/HttpClient';
import {showAlert} from '../components/Dialog';

const _AdminOrder: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
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
  const updateExpress = async ({expressCompany, expressId}: Order) => {
    const order = (await defaultHttpClient.patch<Resource<Order>>(
        `/order/${orderId}`, {expressCompany, expressId}, {autoHandlerError: true})
    ).data.data;
    showAlert('更新成功');
  };
  return (
    <Layout title="订单与物流">
      <F title="订单详情" defaultData={order} fields={[
        {key: 'id', input: {label: '订单号', readOnly: true}},
        {key: 'totalPrice', input: {label: '金额', readOnly: true}},
        {
          key: 'status', input: {label: '状态', readOnly: true}, transform: {
            in(string) {return string;},
            out(status) {return orderStatusMap[status];}
          }
        },
        {
          key: 'createdAt', input: {label: '创建时间', readOnly: true}, transform: {
            in(string) {
              return string;
            }, out(iso) {
              return day(iso).format('YYYY年MM月DD日 HH:mm');
            }
          }
        },

      ]}>
      </F>

      <F title="物流信息" defaultData={order} fields={[
        {key: 'expressCompany', input: {label: '物流公司'}, rules: [{required: true}]},
        {key: 'expressId', input: {label: '物流单号'}, rules: [{required: true}]},
      ]} onSubmit={v => updateExpress(v)}>
        <Space/>
        <Stretch>
          <MainButton type="submit">提交</MainButton>
        </Stretch>
      </F>
    </Layout>
  );
};

export const AdminOrder = withRouter(_AdminOrder);
