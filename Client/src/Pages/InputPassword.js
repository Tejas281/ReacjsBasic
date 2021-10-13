import React from "react";
import {TextField, IconButton, InputAdornment} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
const InputPassword = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClickShowPassword = (event) => {
    setShow((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...props}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label="Password"
      type={show ? "text" : "password"}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputPassword;
