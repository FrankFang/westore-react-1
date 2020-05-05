import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {Shops} from './views/Shops';
import {history} from 'lib/history';
import {SignIn} from './views/SignIn';
import {ShopNew} from './views/ShopNew';
import {AdminShop} from './views/AdminShop';
import {AdminShopEdit} from './views/AdminShopEdit';
import {GoodNew} from './views/GoodNew';
import {Good} from './views/Good';
import {GoodEdit} from './views/GoodEdit';
import {Cart} from './views/Cart';
import {Me} from './views/Me';
import {SWRConfig} from 'swr';
import {Shop} from 'views/Shop';


function App() {
  return (
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
          <Route exact path="/shops/:id">
            <Shop/>
          </Route>
          <Route exact path="/admin/shops/:id/edit">
            <AdminShopEdit/>
          </Route>
          <Route exact path="/admin/shops/:shopId/goods/new">
            <GoodNew/>
          </Route>
          <Route exact path="/admin/shops/:shopId/goods/:id">
            <Good/>
          </Route>
          <Route exact path="/admin/shops/:shopId/goods/:id/edit">
            <GoodEdit/>
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
  );
}


export default App;
