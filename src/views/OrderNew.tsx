import React, {useState} from 'react';
import Layout from '../components/Layout';
import {withRouter, RouteComponentProps, Link} from 'react-router-dom';
import {HashQuery} from '../lib/getQuery';
import {useCart} from '../hooks/useCart';
import {Center} from '../components/Center';
import {Space} from '../components/Space';
import {Loading} from '../components/Loading';
import {Panel} from '../components/Panel';
import {getAmount} from '../lib/getAmount';
import {Money} from '../components/Money';
import {F} from '../components/Form';
import {Stretch} from '../components/Stretch';
import {MainButton} from '../components/button/MainButton';
import {defaultHttpClient} from '../lib/HttpClient';

const _OrderNew: React.FC<RouteComponentProps> = (props) => {
  const query = new HashQuery<{ shopId: string }>(props.location);
  const shopId = parseInt(query.get('shopId')!);
  const {cart, isValidating} = useCart();
  const [formData, setFormData] = useState({address: '', contact: '', tel: ''});
  if (isValidating) {
    return <Loading/>;
  }
  if (cart && cart.length > 0) {
    const shopAndGoods = cart.find(({shop, goods}) => shop.id === shopId);
    if (!shopAndGoods) {
      return (
        <Center>
          <Space/>
          商品已被清空，无法创建订单
          <Space/>
        </Center>
      );
    }

    const {shop, goods} = shopAndGoods;
    const pay = async () => {
      const response = await defaultHttpClient.post('/order', {
        address: `${formData.address}`,
        goods: goods.map(g => ({id: g.id, number: g.number}))
      }, {autoHandlerError: true});
      console.log(response);
    };

    return (
      <Layout title="创建订单">
        <Panel>
          <h1>订单金额</h1>
          <p>店铺：<Link to={`/shops/${shop.id}`}>{shop.name}</Link></p>
          <p>金额：<Money>{getAmount(goods)}</Money></p>
        </Panel>

        <F title="收件人" data={formData} fields={[
          {key: 'address', input: {type: 'text', placeholder: '收件地址'}},
          {key: 'contact', input: {type: 'text', placeholder: '联系人'}},
          {key: 'tel', input: {type: 'text', placeholder: '手机号码'}}
        ]} onChange={v => setFormData(v)}>
        </F>
        <Panel>
          <Stretch>
            <MainButton onClick={pay}>支付</MainButton>
          </Stretch>
        </Panel>
      </Layout>
    );
  } else {
    return (
      <Center>
        <Space/>
        购物车被清空了，所以无法创建订单
        <Space/>
      </Center>
    );
  }
};

const OrderNew = withRouter(_OrderNew);

export {OrderNew};
