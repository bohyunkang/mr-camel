import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import ProductList from "pages/ProductList";
import ProductDetail from "pages/ProductDetail";
import ProductRecent from "pages/ProductRecent";
import Header from "components/common/Header";

import history from "./history";
class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Switch>
          {/* <Redirect exact path="/" to="/productlist" /> */}
          <Route exact path="/" component={ProductList} />
          <Route path="/productdetail/:id" component={ProductDetail} />
          <Route path="/recentlist" component={ProductRecent} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
