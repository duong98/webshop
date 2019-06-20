import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import Profile from "Layout/Navigator/Topbar/Profile";
import NavigatorContext from "Layout/Navigator/context";

function Header({ history }) {
  const classes = useStyles();
  const [title, setTitle] = useState("USERS");
  const { drawerExpand, onToggleDrawer } = useContext(NavigatorContext);

  const appBarClassName = clsx(
    classes.appBar,
    drawerExpand && classes.appBarShift
  );
  const menuBtnClassName = clsx(
    classes.menuButton,
    drawerExpand && classes.menuButtonHidden
  );

  useEffect(() => {
    const unlisten = history.listen(({ pathname }) => {
      const newTitle = pathname.split("/")[2];
      return newTitle && setTitle(newTitle.toUpperCase());
    });
    return () => unlisten();
  }, [history]);

  return (
    <AppBar className={appBarClassName}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={onToggleDrawer}
          className={menuBtnClassName}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography component="h1" variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Profile />
      </Toolbar>
    </AppBar>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  }
}));

export default withRouter(Header);
