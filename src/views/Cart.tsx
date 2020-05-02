import Layout from '../components/Layout';
import React from 'react';
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
  }
  .money{
    font-size: 18px; color: ${vars.colorDanger};
  }
`;
const Amount = styled.span`
  flex-grow: 1;
`;
const getAmount = (goods: (Good & { number: number })[]) => {
  return goods.reduce((sum, good) => sum += good.price * good.number, 0);
};
const Footer = styled.footer`
  .order{
    flex-grow: 0;
  }
`;
export const Cart: React.FC = (props) => {
  const {cart, error} = useCart();
  console.log(cart);
  return (
    <Layout title="购物车">
      {cart ?
        cart.map(({shop, goods}) => <Panel>
          <h2>{shop.name}</h2>
          <GoodsList>
            {goods.map(g => <Item>
              <div className="cover">
                <ShapedDiv>
                  <Img src={g.imgUrl}/>
                </ShapedDiv>
              </div>
              <div className="text">
                <Name>{g.name}</Name>
                <p><Money className="money">{g.price}</Money></p>
              </div>
            </Item>)}
          </GoodsList>
          <Footer>
            <Amount>
              总计：<Money>{getAmount(goods)}</Money>
            </Amount>
            <MainButton className="order">结算</MainButton>
          </Footer>
        </Panel>)
        :
        <Loading/>
      }
    </Layout>
  );
};
