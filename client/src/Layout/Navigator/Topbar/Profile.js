import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";

function Proile({ history }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  function onExpand(e) {
    setAnchorEl(e.target);
  }

  function onClose() {
    setAnchorEl(null);
  }

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.removeItem("avatarUrl");
    history.push("/login");
  }

  return (
    <div>
      <IconButton color="inherit" onClick={onExpand}>
        <Icon>person</Icon>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
        <div className={classes.header}>
          <Avatar
            alt="Remy Sharp"
            src={localStorage.getItem("avatarUrl")}
            className={classes.avatar}
          />
          <Typography variant="h6" weight="medium" className={classes.username}>
            {localStorage.getItem("fullname")}
          </Typography>
        </div>
        <IconButton onClick={onLogout} className={classes.actionButton}>
          <Icon>power_settings_new</Icon>
        </IconButton>
      </Menu>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2),
    alignItems: "center"
  },
  username: {
    marginLeft: 10
  },
  avatar: {
    height: 60,
    width: 60
  },
  actionButton: {
    margin: 10,
    float: "right",
    fontSize: 16,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export default withRouter(Proile);
