import React from 'react';
import Layout from '../components/Layout';
import {withRouter} from 'react-router-dom';
import {MainButton} from '../components/button/MainButton';
import Icon from '../components/Icon';
import wepay from 'images/wepay.svg';
import alipay from 'images/alipay.svg';
import {Img} from '../components/Img';
import styled from 'styled-components';
import {Stretch} from '../components/Stretch';
import {showAlert} from '../components/Dialog';

const Payments = styled.div`
  margin-top: 32px;
  img{
    width: 100px;
    height: 100px;
    margin: 0 32px;
  }
`;
const Wrapper = styled.div`
  text-align:center;
  padding: 16px;
`;

const pay = () => {
  showAlert('抱歉，测试环境无法支付，请使用模拟支付');
};
export const _Pay: React.FC = () => {
  const fakePay = () => {

  };
  return (
    <Layout title="支付">
      <Wrapper>
        <Stretch>
          <MainButton onClick={fakePay}>模拟支付</MainButton>
        </Stretch>
        <Payments>
          <Img onClick={pay} src={wepay}/>
          <Img onClick={pay} src={alipay}/>
        </Payments>
      </Wrapper>
    </Layout>
  );
};

export const Pay = withRouter(_Pay);
