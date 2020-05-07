import React from 'react';
import Layout from '../components/Layout';
import {withRouter} from 'react-router-dom';

export const _Pay: React.FC = () => {
  return (
    <Layout title="支付">hi</Layout>
  );
};

export const Pay = withRouter(_Pay);
