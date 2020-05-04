import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Wrapper} from './Shop.Wrapper';
import {F} from '../components/Form';
import {Space} from '../components/Space';
import {MainButton} from '../components/button/MainButton';
import {Stretch} from '../components/Stretch';
import {defaultHttpClient} from '../lib/HttpClient';
import {Loading} from '../components/Loading';
import {showAlert} from '../components/Dialog';
import {DangerButton} from '../components/button/DangerButton';
import {history} from '../lib/history';
import {useShop} from '../hooks/useShop';
import {Panel} from '../components/Panel';

const _ShopEdit: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const {shop, mutate} = useShop(props.match.params.id);
  if (!shop) {return <Loading/>;}

  const updateShop = async (data: typeof shop) => {
    await defaultHttpClient.patch(`/shop/${props.match.params.id}`, data, {autoHandlerError: true});
    showAlert('更新成功');
    mutate(data);
  };
  const deleteShop = async (id: number) => {
    await defaultHttpClient.delete(`/shop/${id}`);
    showAlert('删除成功', () => {
      history.push('/shops');
    });
  };
  return (
    <Wrapper shop={shop}>
      <Space/>
      <F title="店铺信息"
        defaultData={shop} fields={[
        {key: 'name', input: {placeholder: '* 店铺名称'}, rules: [{required: true}]},
        {key: 'description', input: {placeholder: '* 店铺描述'}, rules: [{required: true}]},
        {key: 'imgUrl', input: {placeholder: '店铺Logo'}},
      ]} onSubmit={updateShop}>
        <Stretch>
          <MainButton type="submit">保存</MainButton>
        </Stretch>
      </F>

      <Panel>
        <h1>其他设置</h1>
        <Stretch>
          <DangerButton onClick={() => deleteShop(shop.id)}>删除店铺</DangerButton>
        </Stretch>
      </Panel>
    </Wrapper>
  );
};

export const ShopEdit = withRouter(_ShopEdit);
