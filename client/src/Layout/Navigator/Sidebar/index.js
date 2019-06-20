import React, { useContext } from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import { getListItems } from "Layout/Navigator/Sidebar/MenuItems";
import NavigatorContext from "Layout/Navigator/context";

export default function AppDrawer() {
  const classes = useStyles();
  const { drawerExpand, onToggleDrawer } = useContext(NavigatorContext);
  const paper = clsx(
    classes.drawerPaper,
    !drawerExpand && classes.drawerPaperClose
  );

  return (
    <Drawer variant="permanent" classes={{ paper }} open={drawerExpand}>
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onToggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List component="div" disablePadding>
        {getListItems()}
      </List>
      <Divider />
    </Drawer>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
}));
