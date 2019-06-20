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
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  OutlinedInput
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import swal from "sweetalert";
import * as productServices from "services/product.services";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, product, refetch }) {
  const [submit, setSubmit] = useState({
    title: "",
    price: "",
    imageurl: "",
    category: "",
    quanity: ""
  });

  useEffect(resetForm, [open]);

  useEffect(() => {
    if (product) {
      setSubmit({ ...product });
    }
  }, [product]);

  function getDialogProps() {
    return {
      fullScreen: true,
      open,
      onClose,
      TransitionComponent: Transition
    };
  }

  const getTextFieldProps = label => name => {
    return {
      value: submit[name],
      onChange: e => setSubmit({ ...submit, [name]: e.target.value }),
      label,
      fullWidth: true,
      autoComplete: "off",
      margin: "normal",
      variant: "outlined"
    };
  };

  async function onSubmit() {
    const api = product ? productServices.update : productServices.add;
    try {
      await api(submit);
      swal({
        title: product ? "UPDATE SUCCESS" : "CREATE PRODUCT SUCCESS",
        icon: "success"
      });
      refetch();
      onClose();
    } catch (error) {
      swal({
        title: product ? "UPDATE FAIL" : "CREATE PRODUCT FAIL",
        icon: "error"
      });
    }
  }

  function resetForm() {
    setSubmit({
      title: "",
      price: "",
      imageurl: "",
      category: "",
      quanity: ""
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
            <div className="font-medium text-xl ml-6">PRODUCT FORM</div>
          </div>
          <Divider />
          <TextField {...getTextFieldProps("TITLE")("title")} />
          <TextField {...getTextFieldProps("PRICE")("price")} />
          <TextField {...getTextFieldProps("AVATAR URL")("imageurl")} />
          {!product && (
            <TextField {...getTextFieldProps("QUANITY")("quanity")} />
          )}
          <FormControl variant="outlined" margin="normal" className="w-full">
            <InputLabel>CATEGORY</InputLabel>
            <Select
              value={submit.category}
              onChange={e => setSubmit({ ...submit, category: e.target.value })}
              input={<OutlinedInput labelWidth={85} name="CATEGORIES" />}
            >
              <MenuItem value="1">Table tennis paddle</MenuItem>
              <MenuItem value="2">Tennis racket</MenuItem>
              <MenuItem value="3">Badminton racket</MenuItem>
              <MenuItem value="4">Baseball bat</MenuItem>
              <MenuItem value="5">Ball</MenuItem>
              <MenuItem value="6">Shoe</MenuItem>
              <MenuItem value="10">Shirt</MenuItem>
              <MenuItem value="11">Shorts</MenuItem>
              <MenuItem value="20">Dumbbell</MenuItem>
            </Select>
          </FormControl>
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
