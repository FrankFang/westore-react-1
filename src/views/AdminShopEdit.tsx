import React, {useEffect, useRef} from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {ShopLayout} from './Shop.Layout';
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
import {QRCode} from 'lib/qrcode.js';
import styled from 'styled-components';
import {config} from 'config';
import {Tabs} from './AdminShop.Tabs';
import Icon from '../components/Icon';

const {origin} = config;

const QRCodeWrapper = styled.div`
  width: 128px; 
  height: 128px; 
  margin: 16px auto;
`;

const _ShopEdit: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const {shop, mutate} = useShop(props.match.params.id);
  const shopId = shop?.id;
  const qrcodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!qrcodeRef.current) {return;}
    var qrcode = new QRCode(qrcodeRef.current, {
      text: `${origin}/shops/${shopId}`,
      width: 128,
      height: 128,
      colorDark: '#000',
      colorLight: '#FFF',
      correctLevel: QRCode.CorrectLevel.H
    });
    return () => {
      qrcode.clear();
    };
  }, [shopId]);
  if (!shop) {return <Loading/>;}

  const updateShop = async (data: typeof shop) => {
    await defaultHttpClient.patch(`/shop/${props.match.params.id}`, data, {autoHandlerError: true});
    showAlert('更新成功');
    mutate(data);
  };
  const deleteShop = async (id: number) => {
    await defaultHttpClient.delete(`/shop/${id}`);
    showAlert('删除成功', () => {
      history.push('/admin/shops');
    });
  };
  const openShop = () => {
    history.push(`/shops/${shopId}`);
  };
  return (
    <ShopLayout shop={shop} title="店铺管理" action={
      shop &&
      <Link to={`/admin/shops/${shop.id}/goods/new`}>
        <Icon name="add"/>
      </Link>
    }>
      <Space/>
      <Tabs shop={shop}/>
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
        <h1>预览</h1>
        <QRCodeWrapper ref={qrcodeRef}/>
        <Stretch>
          <MainButton onClick={openShop}>打开店铺</MainButton>
        </Stretch>
      </Panel>

      <Panel>
        <h1>其他设置</h1>
        <Stretch>
          <DangerButton onClick={() => deleteShop(shop.id)}>删除店铺</DangerButton>
        </Stretch>
      </Panel>
    </ShopLayout>
  );
};

export const AdminShopEdit = withRouter(_ShopEdit);
