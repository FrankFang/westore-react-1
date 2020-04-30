import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {Shops} from './views/Shops';
import {history} from 'lib/history';
import {SignIn} from './views/SignIn';
import {ShopNew} from './views/ShopNew';
import {Shop} from './views/Shop';
import {ShopEdit} from './views/ShopEdit';
import {GoodNew} from './views/GoodNew';
import {Good} from './views/Good';
import {GoodEdit} from './views/GoodEdit';


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/admin/shops">
          <Shops/>
        </Route>
        <Route exact path="/admin/shops/new">
          <ShopNew/>
        </Route>
        <Route exact path="/admin/shops/:id">
          <Shop/>
        </Route>
        <Route exact path="/admin/shops/:id/edit">
          <ShopEdit/>
        </Route>
        <Route exact path="/admin/shops/:id/goods/new">
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
        <Redirect exact from="/" to="/admin/shops"/>
        <Route path="*">
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
