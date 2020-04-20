import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {MyShops} from './views/MyShops';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/my_shops">
          <MyShops/>
        </Route>
        <Redirect exact from="/" to="/my_shops"/>
        <Route path="*">
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
