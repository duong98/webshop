import React, { useState } from "react";

import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  InputLabel,
  Select,
  OutlinedInput,
  Avatar,
  FormControl,
  MenuItem
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import * as userServices from "services/user.services";

export default function SignInSide({ history }) {
  const classes = useStyles();
  const [submit, setSubmit] = useState({
    username: "",
    fullname: "",
    password: "",
    confirmPw: "",
    avatarUrl: "",
    role: "customer"
  });

  async function onSignup() {
    const success = await userServices.add(submit);
    if (success) {
      swal({ title: "SIGNUP SUCCESS", icon: "success" });
      history.push("login");
      return;
    }
    swal({ title: "SIGNUP FAIL", icon: "error" });
  }

  function getFieldProps(label, name) {
    return {
      variant: "outlined",
      margin: "normal",
      fullWidth: true,
      label,
      name,
      value: submit[name],
      onChange: function(e) {
        setSubmit({ ...submit, [name]: e.target.value });
      }
    };
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} autoComplete="off" onSubmit={onSignup}>
            <TextField {...getFieldProps("User Name", "username")} />
            <TextField {...getFieldProps("Full Name", "fullname")} />
            <TextField {...getFieldProps("Password", "password")} />
            <TextField {...getFieldProps("Confirm Password", "confirmPw")} />
            <TextField {...getFieldProps("Avatar URL", "avatarUrl")} />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Role</InputLabel>
              <Select
                value={submit.role}
                onChange={e => setSubmit({ ...submit, role: e.target.value })}
                input={<OutlinedInput labelWidth={40} name="Role" />}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={onSignup}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              children="Sign UP"
            />
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(images/background.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  formControl: {
    width: "100%",
    marginTop: 10
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
