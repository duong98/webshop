import React from "react";
import { Link, Route } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

function ItemLink({ label, to, exact, iconName }) {
  const renderLink = React.forwardRef((itemProps, ref) => (
    <Link to={to} {...itemProps} ref={ref} />
  ));

  return (
    <Route
      key={label}
      path={to}
      exact={exact}
      children={({ match }) => (
        <ListItem button component={renderLink} selected={match ? true : false}>
          <ListItemIcon>
            <Icon>{iconName}</Icon>
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      )}
    />
  );
}

const mainLinks = [
  {
    to: "/app/dashboard",
    label: "Dashboard",
    iconName: "dashboard",
    acceptRole: "admin"
  },
  {
    to: "/app/shopping",
    label: "Shopping",
    iconName: "shopping",
    acceptRole: "admin,customer,seller"
  },
  { to: "/app/users", label: "Users", iconName: "people", acceptRole: "admin" },

  {
    to: "/app/product",
    label: "Product",
    iconName: "list",
    acceptRole: "admin,seller"
  }
];

export function getListItems() {
  const userRole = localStorage.getItem("userRole");
  return mainLinks
    .filter(link => link.acceptRole.indexOf(userRole) >= 0)
    .map(ItemLink);
}
