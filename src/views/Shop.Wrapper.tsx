import React from 'react';
import Layout from '../components/Layout';
import {Link, NavLink, RouteComponentProps, withRouter} from 'react-router-dom';
import Icon from '../components/Icon';
import westore from '../images/westore.svg';
import styled from 'styled-components';
import vars from '_vars.scss';
import {Space} from '../components/Space';

const Summary = styled.div`
  display:flex; justify-content: space-between; background: white;
  margin-top: 8px; padding: 16px; 
  figure{
    width: 64px; height: 64px; display:flex; justify-content: center; align-items: center;
    flex-shrink: 0; margin-right: 16px; border: 1px solid ${vars.colorBorder}; 
    border-radius: 4px; overflow: hidden;
    img{ max-width: 100%; max-height: 100%;}  
  } 
  article{
    h1{
      font-size: 24px;
      line-height: 1em;
      margin-bottom: 8px;
    }
    p{
      line-height: 24px;
      color: ${vars.colorText3};
      max-height: 72px;
      overflow: hidden;
      display: -webkit-box;   
      -webkit-line-clamp: 3;   
      -webkit-box-orient: vertical;     
      &.open{
        max-height: none;
        display:block;
      }
    }
  }
`;
const Tabs = styled.ol`
  background: white;
  font-size: 18px;
  display:flex;
  > li{
    flex-grow: 1;
    > a{
      height: ${vars.heightTab};
      display:flex;
      justify-content: center;
      align-items: center;
      position:relative;
      &.active::after{
        content: '';
        display:block;
        height: 3px;
        position:absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: ${vars.colorMain}; 
      }
    }
  }
`;

interface Props extends RouteComponentProps<{ id: string }> {
  shop?: Shop;
}

const _Shop: React.FC<Props> = ({shop, children}) => {
  return (
    <Layout title={shop?.name ?? '店铺详情'} action={
      shop && <Link to={`/admin/shops/${shop.id}/goods/new`}>
        <Icon name="add"/>
      </Link>
    }>
      <Summary>
        <figure>
          <img src={westore} alt=""/>
        </figure>
        <article>
          <h1>小明的书店</h1>
          <p>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</p>
        </article>
      </Summary>

      <Space/>

      {
        shop &&
        <Tabs>
          <li>
            <NavLink exact to={`/admin/shops/${shop.id}`} activeClassName="active">
              商品
            </NavLink>
          </li>
          <li>
            <NavLink exact to={`/admin/shops/${shop.id}/edit`} activeClassName="active">
              设置
            </NavLink>
          </li>
        </Tabs>
      }

      {children}
    </Layout>
  );
};

export const Wrapper = withRouter(_Shop);
