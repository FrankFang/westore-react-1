import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {Shops} from './views/Shops';
import {history} from 'lib/history';
import {SignIn} from './views/SignIn';
import {ShopNew} from './views/ShopNew';
import {Shop} from './views/Shop';
import {ShopEdit} from './views/ShopEdit';


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
        <Route exact path="/shops/:id">
          <Shop/>
        </Route>
        <Route exact path="/shops/:id/edit">
          <ShopEdit/>
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
