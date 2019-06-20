import React from "react";

import { makeStyles } from "@material-ui/styles";
import { Button, Typography } from "@material-ui/core";

export default function PageTitle({ button, title }) {
  const classes = useStyles();
  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {title}
      </Typography>
      {button && (
        <Button
          classes={{ root: classes.button }}
          variant="contained"
          size="large"
          color="secondary"
        >
          {button}
        </Button>
      )}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  typo: {
    color: theme.palette.text.hint
  },
  button: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide
    }
  }
}));
