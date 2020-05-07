import Layout from '../components/Layout';
import React, {useState} from 'react';
import {useCart} from '../hooks/useCart';
import {Loading} from '../components/Loading';
import styled from 'styled-components';
import {Panel} from '../components/Panel';
import {Img} from '../components/Img';
import {ShapedDiv} from '../components/ShapedDiv';
import vars from '_vars.scss';
import {Money} from '../components/Money';
import {Name} from '../components/Name';
import {MainButton} from '../components/button/MainButton';
import {MinorButton} from '../components/button/MinorButton';
import {defaultHttpClient} from '../lib/HttpClient';
import {Link} from 'react-router-dom';

const GoodsList = styled.div`
  margin-top: 16px;
  &:empty{display:none;} 
`;
const Item = styled.div`
  margin-bottom: 16px;
  display:flex;
  > .cover{
    width: 80px; border: 1px solid ${vars.colorBorder}; border-radius: ${vars.borderRadius};
    margin-right: 16px;
  } 
  > .text{
    display:flex; 
    flex-direction: column;
    justify-content: space-between;
    position:relative;
    flex-grow: 1;
  }
  .money{
    font-size: 18px; color: ${vars.colorDanger};
  }
`;
const Amount = styled.span`
  flex-grow: 1;
`;
const getAmount = (goods: (Good & { number: number })[]) => {
  return goods.reduce((sum, good) => {
    sum += good.price * good.number;
    return sum;
  }, 0);
};
const Footer = styled.footer`
  .order{
    flex-grow: 0;
  }
`;
const Remove = styled(MinorButton)`
  position:absolute; right: 0; bottom: 0;
`;
export const Cart: React.FC = (props) => {
  const {cart, updateShopCart} = useCart();
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => {
    setEdit(x => !x);
  };
  const remove = async (shopId: number, goodId: number) => {
    const response = await defaultHttpClient.delete<Resource<{ shop: Shop, goods: (Good & { number: number })[] }>>(
      `/shoppingCart/${goodId}`, {autoHandlerError: true});
    const {shop, goods} = response.data.data;
    updateShopCart(shopId, shop, goods);
  };
  const createOrder = async (goods: (Good & { number: number })[]) => {
    const response = await defaultHttpClient.post('/order', {
      goods: goods.map(g => ({id: g.id, number: g.number}))
    }, {autoHandlerError: true});
    console.log(response);
  };
  return (
    <Layout title="购物车" action={
      <span onClick={toggleEdit}>{edit ? '取消' : '编辑'}</span>
    }>
      {cart ?
        cart.map(({shop, goods}) => <Panel key={shop.id}>
          <h2><Link to={`/shops/${shop.id}`}>{shop.name}</Link></h2>
          <GoodsList>
            {goods.map(g => <Item key={g.id}>
              <div className="cover">
                <ShapedDiv>
                  <Img src={g.imgUrl}/>
                </ShapedDiv>
              </div>
              <div className="text">
                <Name>{g.name}</Name>
                <p><Money className="money">{g.price}</Money></p>
                {edit && <Remove size="small" onClick={() => remove(shop.id, g.id)}>删除</Remove>}
              </div>
            </Item>)}
          </GoodsList>
          <Footer>
            <Amount>
              总计：<Money>{getAmount(goods)}</Money>
            </Amount>
            <MainButton className="order" onClick={() => createOrder(goods)}>结算</MainButton>
          </Footer>
        </Panel>)
        :
        <Loading/>
      }
    </Layout>
  );
};
