import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import swal from "sweetalert";

export default function SignInSide({ history }) {
  const classes = useStyles();
  const [submit, setSubmit] = useState({ username: "", password: "" });

  async function onLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/login",
        submit
      );
      const {
        username,
        role,
        fullname,
        avatar_url,
        user_id
      } = response.data.data;
      localStorage.setItem("token", username);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("userRole", role);
      localStorage.setItem("fullname", fullname);
      localStorage.setItem("avatarUrl", avatar_url);
      history.push("/app");
    } catch (error) {
      swal({ title: "LOGIN FAIL!", icon: "error" });
    }
  }

  function getFieldProps(label, name, type) {
    return {
      label,
      name,
      type,
      value: submit[name],
      onChange: e => setSubmit({ ...submit, [name]: e.target.value }),
      variant: "outlined",
      margin: "normal",
      fullWidth: true,
      autoComplete: "off"
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
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField {...getFieldProps("user name", "username", "text")} />
            <TextField {...getFieldProps("password", "password", "password")} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              children="Login"
              onClick={onLogin}
            />
            <Grid container>
              <Grid item>
                <Link to="/signup">"Don't have an account? Sign Up"</Link>
              </Grid>
            </Grid>
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
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
