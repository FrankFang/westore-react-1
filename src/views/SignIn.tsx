import React, {useState} from 'react';
import {history, pathnameBeforeSignIn} from '../lib/history';
import Icon from 'components/Icon';
import styled from 'styled-components';
import {Input} from '../components/Input';
import vars from '_vars.scss';
import {MainButton} from '../components/button/MainButton';
import {MinorButton} from '../components/button/MinorButton';
import {defaultHttpClient} from '../lib/HttpClient';
import {validate} from '../lib/validate';

const Logo = styled(Icon)`
  width: 100px;
  height: 100px;
`;
const Header = styled.header`
  padding-top: 100px; 
  text-align:center;
  margin-bottom: 16px;
  .icon {
    fill: ${vars.colorMain};
  }
  h1{margin-top: 0; font-size: 20px;}
`;
const Main = styled.div`

`;
const Form = styled.form`
  padding: 0 16px;
`;
const Wrapper = styled.div`
  background:white;
  min-height: 100vh;
`;
const FormRow = styled.div`
  margin: 8px 0;
  display:flex;
  > * + * {
    margin-left: 8px; 
  }
`;
const Center = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`;
const Space = styled.div`
  height: 16px;
`;

export const SignIn: React.FC = () => {
  type Errors = { [K in keyof typeof formData]: string[] } | null
  const [errors, setErrors] = useState<Errors>(null);
  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const errors = await validate(formData, {
      tel: [{required: true, message: '必填'}, {format: 'china phone', message: '手机号码格式不正确'}],
      code: [{required: true, message: '必填'}]
    });
    setErrors(errors);
    // history.push(pathnameBeforeSignIn.value || '/');
  };
  const [formData, setFormData] = useState({
    tel: '',
    code: ''
  });
  const sendCode = () => {
    defaultHttpClient.post('/api/v1/code', {tel: formData.tel});
  };
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
          {errors?.['tel'] && (
            <FormRow>
              {errors['tel'][0]}
            </FormRow>
          )}
          <FormRow>
            <Input type="text" placeholder="验证码"
              value={formData.code}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  code: (e.target as HTMLInputElement).value
                });
              }}/>
            <MinorButton onClick={sendCode}>发送验证码</MinorButton>
          </FormRow>
          {errors?.['code'] && (
            <FormRow>
              {errors['code'][0]}
            </FormRow>
          )}
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


