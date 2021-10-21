import React, { useState, useEffect } from "react";
import {makeStyles,Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,Container,} from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import InputPassword from "./InputPassword";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage(props) {
  const classes = useStyles();
  const api = "http://localhost:5000/api/auth";
  const [user, setUser] = useState({ email: "", password: "" });
  const history = useHistory();
  console.log("user", user);
  const { email, password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/admin/dashboard");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(api, { ...user })
      .then((res) => {
        const { token , role } = res.data;  
        console.log("Tokennnnnnnnnn " , res.data)
        localStorage.setItem('token', JSON.stringify({token, role}));
        if(role === 'admin')
        {
         props.history.push('/admin/dashboard'); 
        }
        else{
          props.history.push('/dashboard'); 
        }
        console.log("token data is", res.data);
         
      })
      .catch((err) => {
        alert("User Not EmailId-Password Not Correct ", err);
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <InputPassword
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
LoginPage.prototypes = {
  setToken: PropTypes.func.isRequired,
};
