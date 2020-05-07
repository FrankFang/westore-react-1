import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {Shops} from './views/Shops';
import {history} from 'lib/history';
import {SignIn} from './views/SignIn';
import {ShopNew} from './views/ShopNew';
import {AdminShop} from './views/AdminShop';
import {AdminShopEdit} from './views/AdminShopEdit';
import {GoodNew} from './views/GoodNew';
import {AdminGood} from './views/AdminGood';
import {GoodEdit} from './views/GoodEdit';
import {Cart} from './views/Cart';
import {Me} from './views/Me';
import {SWRConfig} from 'swr';
import {Shop} from 'views/Shop';
import {Good} from 'views/Good';
import {OrderNew} from 'views/OrderNew';
import {Pay} from './views/Pay';
import {Orders} from './views/Orders';

import {AdminOrder} from './views/AdminOrder';
import styled from 'styled-components';
import {Order} from './views/Order';
import {AdminOrders} from './views/AdminOrders';

const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

function App() {
  return (
    <Wrapper>
      <SWRConfig value={{shouldRetryOnError: false}}>
        <Router history={history}>
          <Switch>
            <Route exact path="/admin/shops">
              <Shops/>
            </Route>
            <Route exact path="/admin/shops/new">
              <ShopNew/>
            </Route>
            <Route exact path="/admin/shops/:id">
              <AdminShop/>
            </Route>
            <Route exact path="/admin/shops/:id/edit">
              <AdminShopEdit/>
            </Route>
            <Route exact path="/admin/shops/:shopId/goods/new">
              <GoodNew/>
            </Route>
            <Route exact path="/admin/shops/:shopId/goods/:id">
              <AdminGood/>
            </Route>
            <Route exact path="/admin/shops/:shopId/goods/:id/edit">
              <GoodEdit/>
            </Route>
            <Route exact path="/admin/orders">
              <AdminOrders/>
            </Route>
            <Route exact path="/admin/orders/:id">
              <AdminOrder/>
            </Route>
            <Route exact path="/orders">
              <Orders/>
            </Route>
            <Route exact path="/orders/new">
              <OrderNew/>
            </Route>
            <Route exact path="/orders/:id/pay">
              <Pay/>
            </Route>
            <Route exact path="/shops/:shopId/goods/:id">
              <Good/>
            </Route>
            <Route exact path="/shops/:id">
              <Shop/>
            </Route>
            <Route exact path="/orders/:id">
              <Order/>
            </Route>
            <Route exact path="/sign_in">
              <SignIn/>
            </Route>
            <Route exact path="/cart">
              <Cart/>
            </Route>
            <Route exact path="/me">
              <Me/>
            </Route>
            <Redirect exact from="/" to="/admin/shops"/>
            <Route path="*">
            </Route>
          </Switch>
        </Router>
      </SWRConfig>
    </Wrapper>
  );
}


export default App;
