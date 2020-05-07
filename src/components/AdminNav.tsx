import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import React from 'react';
import Icon from './Icon';
import vars from '_vars.scss';

const NavWrapper = styled.nav`
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  background: white;
  display:flex;
    > a{
      width: 33.3333%;
      text-align:center;
      display: flex;
      flex-direction: column;
      padding: 8px 0 4px;
      justify-content: center;
      align-items: center;
      .icon {
        width: 24px;      
        height: 24px;
      }
      &.active{
        color: ${vars.colorMain};
      }
  }
`;

export const AdminNav = () => {
  return (
    <NavWrapper>
      <NavLink to="/admin/shops" exact activeClassName="active">
        <Icon name="shop"/>
        <span>店铺</span>
      </NavLink>
      <NavLink to="/admin/orders" exact activeClassName="active">
        <Icon name="order"/>
        <span>订单</span>
      </NavLink>
      <NavLink to="/me" exact activeClassName="active">
        <Icon name="user"/>
        <span>个人</span>
      </NavLink>
    </NavWrapper>
  );
};

