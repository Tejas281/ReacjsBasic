import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
//import { Link } from 'react-router';
import Dashboard from './Dashboard';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage(props) {
  const classes = useStyles();
  // const token = sessionStorage.setItem('token', JSON.stringify(token));
  const api = 'http://localhost:5000/api/auth';
  const [user, setUser] = useState({ email: '', password: '' });
  const history = useHistory();
  console.log('user', user);
  const { email, password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('./Dashboard');
    }
  }, []);
  const setToken = (key, value) => {
    return Promise.resolve().then(() => {
      console.log('setting token');
      localStorage.setItem(key, value);
      console.log('token set');
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    // Form submit
    // get response form server
    // validate response
    // If response is ok then set token to the localstorage and redirect to the dashboard, else show an error message.
    // const token = localStorage.setItem('token', JSON.stringify(token));

    axios
      .post(api, { ...user })
      .then((res) => {
        //this are store the token
        const { token } = res.data;
        //this are set Item in token
        // setToken('token', token).then(() => {
        localStorage.setItem('token', token);
        console.log('redirecting');
        props.history.push('/dashboard');
        // //window location are the used to redirect the particular page
        // if (token) {
        //   // window.location = '/Dashboard';
        // } else {
        //   history.push('/LoginPage');
        //   // window.location = '/LoginPage';
        // }
        // alert('User Login', res.data.user);
        //props.history.push('');
        // });
      })
      .catch((err) => {
        alert('User Not EmailId-Password Not Correct ', err);
        console.log(err);
      });
    // const header = `Authorization: Bearer ${token}`;
    //axios.get('')
    //localStorage.getItem(token);
    //console.log('Token IS', token);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={email}
            onChange={handleChange}
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            value={password}
            onChange={handleChange}
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
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
