import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import {MyShops} from './views/MyShops';
import {history} from 'lib/history';
import {SignIn} from './views/SignIn';


function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/my_shops">
          <MyShops/>
        </Route>
        <Route path="/sign_in">
          <SignIn/>
        </Route>
        <Redirect exact from="/" to="/my_shops"/>
        <Route path="*">
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
