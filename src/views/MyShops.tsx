import React, {Suspense} from 'react';
import Layout from '../components/Layout';
import {defaultHttpClient} from '../lib/HttpClient';
import {Loading} from '../components/Loading';
import useSWR, {SWRConfig} from 'swr';

const Wrapper: React.FC = () => {
  console.log('useSWR');
  const {data, error} = useSWR<any, any>('/shop', (url) => {
    return defaultHttpClient.get<any>(url, {autoHandlerError: true});
  });
  return (
    <div>
      {JSON.stringify(data)}
      <hr/>
      {JSON.stringify(error)
      }
    </div>
  );
};
const MyShops: React.FC = () => {
  return (
    <SWRConfig value={{shouldRetryOnError: false}}>
      <Layout title="我的店铺">
        <Suspense fallback={<Loading/>}>
          <Wrapper/>
        </Suspense>
      </Layout>
    </SWRConfig>
  );
};

export {MyShops};
