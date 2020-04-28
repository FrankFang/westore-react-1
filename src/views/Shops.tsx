import React, {Suspense} from 'react';
import Layout from '../components/Layout';
import {Loading} from '../components/Loading';
import {SWRConfig} from 'swr';
import Icon from '../components/Icon';
import vars from '_vars.scss';
import {Wrapper} from './MyShops.Wrapper';
import {Link} from 'react-router-dom';


const Shops: React.FC = () => {
  return (
    <SWRConfig value={{shouldRetryOnError: false}}>
      <Layout title="我的店铺" action={
        <Link to="/admin/shops/new">
          <Icon name="add" fill={vars.colorMain}/>
        </Link>
      }>
        <Suspense fallback={<Loading/>}>
          <Wrapper/>
        </Suspense>
      </Layout>
    </SWRConfig>
  );
};

export {Shops};
