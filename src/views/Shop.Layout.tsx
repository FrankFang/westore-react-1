import React, {ReactNode} from 'react';
import Layout from '../components/Layout';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import westore from '../images/westore.svg';
import styled from 'styled-components';
import vars from '_vars.scss';

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
    flex-grow: 1;
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

interface Props extends RouteComponentProps<{ id: string }> {
  shop?: Shop;
  action?: ReactNode;
  title: string;
  footer?: ReactNode;
}

const _Shop: React.FC<Props> = ({shop, title, action, children, footer}) => {
  return (
    <Layout title={title} action={action} footer={footer}>
      <Summary>
        <figure>
          <img src={westore} alt=""/>
        </figure>
        <article>
          <h1>{shop?.name ?? ' '}</h1>
          <p>{shop?.description ?? ''}</p>
        </article>
      </Summary>


      {children}
    </Layout>
  );
};

export const ShopLayout = withRouter(_Shop);
