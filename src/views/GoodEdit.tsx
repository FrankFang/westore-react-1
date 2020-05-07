import React, {useState} from 'react';
import Layout from '../components/Layout';
import {F} from '../components/Form';
import {MainButton} from '../components/button/MainButton';
import {Stretch} from '../components/Stretch';
import {defaultHttpClient} from '../lib/HttpClient';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {useGood} from '../hooks/useGood';
import {Loading} from '../components/Loading';
import {showAlert} from '../components/Dialog';

const _GoodEdit: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const goodId = props.match.params.id;
  const {good, mutate} = useGood(goodId);
  const submit = async (v: typeof good) => {
    await defaultHttpClient.patch(`/goods/${v!.id}`, {...v, id: undefined}, {autoHandlerError: true});
    showAlert('更新成功');
  };
  if (!good) {
    return <Loading/>;
  }
  return (
    <Layout title="新增商品">
      <F onSubmit={submit} title="商品详情" defaultData={good} fields={[
        {key: 'name', input: {placeholder: '* 标题'}, rules: [{required: true}]},
        {key: 'price', input: {placeholder: '* 价格'}, rules: [{required: true}]},
        {key: 'stock', input: {placeholder: '* 库存'}, rules: [{required: true}]},
        {key: 'description', input: {placeholder: '副标题'}},
        {key: 'details', input: {placeholder: '详细描述'}},
        {key: 'imgUrl', input: {placeholder: '图片'}},
        {key: 'shopId', input: {type: 'hidden'}}
      ]}>
        <Stretch>
          <MainButton type="submit">提交</MainButton>
        </Stretch>
      </F>
    </Layout>
  );
};

export const GoodEdit = withRouter(_GoodEdit);
