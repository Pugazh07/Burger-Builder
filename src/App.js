import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
        <div>
          <Layout>
            {/* <BurgerBuilder />
            <Checkout /> */}
            <Switch>
              <Route path="/burger-builder" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Redirect from="/" to="/burger-builder" />
            </Switch>
          </Layout>
        </div>      
    );
  }
}

export default App;
