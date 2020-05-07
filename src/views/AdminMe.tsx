import React from 'react';
import Layout from '../components/Layout';
import {MainButton} from '../components/button/MainButton';
import {Padding} from '../components/Padding';
import {Stretch} from '../components/Stretch';
import {Form, FormRow} from '../components/Form';
import {Input} from '../components/Input';
import {Space} from '../components/Space';
import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';
import {Loading} from '../components/Loading';
import {showAlert} from '../components/Dialog';
import {history, pathnameBeforeSignIn} from '../lib/history';
import {Center} from '../components/Center';
import { AdminNav } from 'components/AdminNav';

export const AdminMe: React.FC = () => {
  const {data} = useSWR('/status', async (url) =>
    (await defaultHttpClient.get<{ login: boolean; user: User }>(url, {autoHandlerError: true})).data
  );

  if (!data) {return <Loading/>;}
  const {login, user} = data;

  if (!login) {
    return (
      <Padding>
        <Center>
          <MainButton onClick={() => {
            pathnameBeforeSignIn.value = history.location.pathname;
            history.push('/sign_in');
          }}>请先登录</MainButton>
        </Center>
      </Padding>
    );
  }


  const signOut = async () => {
    await defaultHttpClient.post(`/logout`, null, {autoHandlerError: true});
    showAlert('登出成功', () => {
      history.push('/sign_in');
    });
  };
  return (
    <Layout title="个人页面" footer={<AdminNav/>} hasBack={false}>
      <Space/>
      {user ?
        <>
          <Form>
            <h1>个人信息</h1>
            <FormRow>
              <Input label="手机号码" value={user.tel} readOnly={true}/>
            </FormRow>
          </Form>
          <Padding>
            <Stretch>
              <MainButton onClick={signOut}>登出</MainButton>
            </Stretch>
          </Padding>
        </>
        :
        <Loading/>
      }
    </Layout>
  );
};
