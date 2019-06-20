import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AppThemeProvider from "App/theme";
import Layout from "Layout";
import Login from "views/Login";
import SignUp from "views/SignUp";

import "App/tailwind.css";
function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/app/dashboard" />}
          />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/shopping" />}
          />
          <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

function PrivateRoute({ component, ...rest }) {
  function render(props) {
    if (localStorage.getItem("token")) {
      return React.createElement(component, props);
    }
    return <Redirect to={{ pathname: "/login" }} />;
  }

  return <Route {...rest} render={render} />;
}

function PublicRoute({ component, ...rest }) {
  function render(props) {
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return React.createElement(component, props);
  }
  return <Route {...rest} render={render} />;
}

export default App;
