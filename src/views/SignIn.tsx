import React, {useState} from 'react';
import {Input} from '../components/Input';
import {MainButton} from '../components/button/MainButton';
import {validate} from '../lib/validate';
import {useSendCodeButton} from '../hooks/useSendCodeButton';
import {Form, FormRow} from '../components/Form';
import {InputError} from '../components/InputError';
import {Header, Logo, Main, Wrapper} from './SignIn.styled';
import {defaultHttpClient} from '../lib/HttpClient';
import {pathnameBeforeSignIn, history} from '../lib/history';
import {Center} from '../components/Center';
import {Space} from '../components/Space';

export const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({tel: '', code: ''});
  type Errors = ErrorsFor<typeof formData>
  const [errors, setErrors] = useState<Errors>(null);
  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const errors = await validate(formData, {
      tel: [{required: true}, {format: 'china phone'}],
      code: [{required: true}]
    });
    setErrors(errors);
    if (errors) {return; }
    await defaultHttpClient.post(`/login`, formData, {
      autoHandlerError: (error) => ![400, 403].includes(error.response?.status)
    }).then(null, (error) => {
      switch (error.response?.status) {
        case 400:
          setErrors({tel: ['请求错误']});
          break;
        case 403:
          setErrors({code: ['验证码错误或过期']});
          break;
      }
      throw error;
    });
    history.push(pathnameBeforeSignIn.value || '/');
    pathnameBeforeSignIn.value = '';
  };
  const {setCodeSent, sendCodeButton} = useSendCodeButton(async () => {
    const errors = await validate({tel: formData.tel}, {
      tel: [{required: true}, {format: 'china phone'}]
    });
    setErrors(errors);
    if (!errors) {
      await defaultHttpClient.post('/code', {tel: formData.tel}, {
        autoHandlerError: (error) => error.response?.status !== 401
      });
      setCodeSent(true);
    }
  });
  return (
    <Wrapper>
      <Header>
        <Logo name="westore"/>
        <h1>小薇店铺</h1>
      </Header>
      <Main>
        <Form onSubmit={onSubmit}>
          <FormRow>
            <Input type="text" placeholder="手机号码"
              value={formData.tel}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  tel: (e.target as HTMLInputElement).value
                });
              }}/>
          </FormRow>
          <FormRow>
            <InputError value={errors?.tel?.[0]}/>
          </FormRow>
          <FormRow>
            <Input type="text" placeholder="验证码"
              value={formData.code}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  code: (e.target as HTMLInputElement).value
                });
              }}/>
            {sendCodeButton}
          </FormRow>
          <FormRow>
            <InputError value={errors?.code?.[0]}/>
          </FormRow>
          <Space/>
          <Space/>
          <Center>
            <MainButton type="submit">登录</MainButton>
          </Center>
        </Form>
      </Main>

    </Wrapper>
  );
};


