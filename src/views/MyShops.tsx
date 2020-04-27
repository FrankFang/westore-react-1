import React, {Suspense} from 'react';
import Layout from '../components/Layout';
import {Loading} from '../components/Loading';
import {SWRConfig} from 'swr';
import Icon from '../components/Icon';
import vars from '_vars.scss';
import {Wrapper} from './MyShops.Wrapper';




const MyShops: React.FC = () => {
  const createShop = () => {};
  return (
    <SWRConfig value={{shouldRetryOnError: false}}>
      <Layout title="我的店铺" action={
        <Icon name="add" fill={vars.colorMain} onClick={createShop}/>
      }>
        <Suspense fallback={<Loading/>}>
          <Wrapper/>
        </Suspense>
      </Layout>
    </SWRConfig>
  );
};

export {MyShops};
