import React from "react";
import { Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import routes from "App/routes";

export default function AppContent() {
  const classes = useStyles();

  function getRoutes() {
    return routes.map(props => <Route key={props.title} {...props} />);
  }

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Switch>{getRoutes()}</Switch>
    </main>
  );
}

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar
}));
