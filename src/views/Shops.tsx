import React from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import vars from '_vars.scss';
import {Link} from 'react-router-dom';
import {List} from './Shops.List';
import Nav from '../components/Nav';


const Shops: React.FC = () => {
  return (
    <Layout hasBack={false} title="店铺列表" action={
      <Link to="/admin/shops/new">
        <Icon name="add" fill={vars.colorMain}/>
      </Link>
    } footer={<Nav/>}>
      <List/>
    </Layout>
  );
};

export {Shops};
