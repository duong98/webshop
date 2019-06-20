import React, { useState, useEffect } from "react";

import {
  Button,
  Paper,
  TextField,
  Dialog,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Divider,
  InputLabel,
  Select,
  OutlinedInput,
  FormControl,
  MenuItem
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import swal from "sweetalert";

import * as userServices from "services/user.services";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, refetch, user }) {
  const [submit, setSubmit] = useState({
    username: "",
    password: "",
    fullname: "",
    confirmPW: "",
    avatarUrl: "",
    role: "admin"
  });

  useEffect(resetForm, [open]);

  useEffect(() => {
    if (user) {
      const { avatar_url, password, ...rest } = user;
      setSubmit(prevState => ({
        ...prevState,
        ...rest,
        password,
        confirmPW: password,
        avatarUrl: avatar_url
      }));
    }
  }, [user]);

  function getDialogProps() {
    return {
      fullScreen: true,
      open,
      onClose,
      TransitionComponent: Transition
    };
  }

  const getTextFieldProps = label => name => type => {
    return {
      value: submit[name],
      onChange: e => setSubmit({ ...submit, [name]: e.target.value }),
      label,
      type,
      fullWidth: true,
      autoComplete: "off",
      margin: "normal",
      variant: "outlined"
    };
  };

  async function onSubmit() {
    if (submit.password !== submit.confirmPW) {
      swal({ title: "PassWord not match!", icon: "error" });
      return;
    }
    const api = user ? userServices.update : userServices.add;
    const success = await api(submit);
    if (success) {
      swal({
        title: user ? "UPDATE USER SUCCESS" : "CREATE USER SUCCESS",
        icon: "success"
      });
      resetForm();
      onClose();
      refetch();
      return;
    }
    swal({
      title: user ? "UPDATE USER FAIL" : "CREATE USER FAIL",
      icon: "error"
    });
  }

  function resetForm() {
    setSubmit({
      username: "",
      password: "",
      fullname: "",
      confirmPW: "",
      avatarUrl: "",
      role: "admin"
    });
  }

  return (
    <Dialog {...getDialogProps()}>
      <AppBar>
        <Toolbar className="flex justify-between">
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="w-full flex justify-center">
        <Paper className="mt-24 p-8 bg-gray-400" style={{ maxWidth: 600 }}>
          <div className="flex items-center mb-4">
            <Avatar style={{ backgroundColor: "#e53e3e" }}>
              <LockOutlinedIcon />
            </Avatar>
            <div className="font-medium text-xl ml-6">USER FORM</div>
          </div>
          <Divider />
          <TextField {...getTextFieldProps("user name")("username")("text")} />
          <TextField {...getTextFieldProps("full name")("fullname")("email")} />
          <TextField
            {...getTextFieldProps("password")("password")("password")}
          />
          <TextField
            {...getTextFieldProps("confirm password")("confirmPW")("password")}
          />
          <TextField
            {...getTextFieldProps("avatar url")("avatarUrl")("text")}
          />
          <div className="my-4">
            <FormControl variant="outlined" className="w-full">
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
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSubmit}
            children="SUBMIT"
          />
        </Paper>
      </div>
    </Dialog>
  );
}
