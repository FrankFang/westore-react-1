import React, {FormEvent, useState} from 'react';
import Layout from '../components/Layout';
import {Form, FormRow} from '../components/Form';
import {Input} from '../components/Input';
import styled from 'styled-components';
import {MainButton} from '../components/button/MainButton';
import {Stretch} from '../components/Stretch';
import {Space} from '../components/Space';
import useSWR from 'swr';
import {defaultHttpClient} from '../lib/HttpClient';
import {Loading} from '../components/Loading';
import {validate} from '../lib/validate';
import {InputError} from '../components/InputError';

const MyForm = styled(Form)`
  background:white;
  padding: 16px;
`;

export const ShopsNew: React.FC = () => {
  const {mutate, data: shop} = useSWR('/shops/new', {
    initialData: {
      name: '',
      description: '',
      imgUrl: '',
    }
  });
  const [errors, setErrors] = useState<ErrorsFor<typeof shop>>(null);
  if (!shop) {return <Loading/>;}
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = await validate(shop, {
      name: [{required: true}, {length: [2, 20]}],
      description: [{required: true}, {length: [2, 100]}]
    });
    setErrors(errors);
    if (!errors) {
      await defaultHttpClient.post('/shop', shop, {autoHandlerError: true});
    }
  };
  return (
    <Layout title="创建店铺">
      <MyForm onSubmit={onSubmit}>
        <FormRow>
          <Input placeholder="* 店铺名称" value={shop.name} onChange={(e) => {
            mutate({...shop, name: e.target.value});
          }}/>
        </FormRow>
        <FormRow>
          <InputError value={errors?.name?.[0]}/>
        </FormRow>
        <FormRow>
          <Input placeholder="* 店铺描述" value={shop.description} onChange={e => {
            mutate({...shop, description: e.target.value});
          }}/>
        </FormRow>
        <FormRow>
          <InputError value={errors?.description?.[0]}/>
        </FormRow>
        <FormRow>
          <Input placeholder="店铺Logo" value={shop.imgUrl} onChange={e => {
            mutate({...shop, imgUrl: e.target.value});
          }}/>
        </FormRow>
        <FormRow>
          <InputError value={errors?.imgUrl?.[0]}/>
        </FormRow>
        <Stretch>
          <Space/>
          <Space/>
          <MainButton type="submit">提交</MainButton>
        </Stretch>
        <FormRow>
          <div>* 表示必填</div>
        </FormRow>
      </MyForm>
    </Layout>
  );
};
