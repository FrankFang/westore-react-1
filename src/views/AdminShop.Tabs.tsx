import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import vars from '_vars.scss';

const Wrapper = styled.ol`
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

interface Props {
  shop?: Shop
}

export const Tabs: React.FC<Props> = (props) => {
  const {shop} = props;
  return (
    shop ?
      <Wrapper>
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
      </Wrapper>
      :
      <Wrapper>
        <li>
          <a>
            商品
          </a>
        </li>
        <li>
          <a>
            设置
          </a>
        </li>
      </Wrapper>
  );
};
