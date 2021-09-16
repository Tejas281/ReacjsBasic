// import React, { useState } from 'react';
// import {useFormik} from 'formik';

// import axios from 'axios';
//import { PermScanWifiTwoTone } from '@material-ui/icons';

// //const { register, error, clearErrors, isAuthenticated } = authContext;

// function Copyright() {

//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function RegisterPage() {

//   const validation = empData => {
//     const errors = {};

//     if (!empData.firstName) {
//       console.log({firstName})
//       errors.firstName = "Please Enter First Name"

//     }
//     else if (empData.firstName.length <= 3)
//     {
//       errors.firstName = 'name Cannot be Exceed 3 Characters'
//       console.log("values max")
//     }
//     if (!empData.lastName) {
//       errors.lastName = "Please Enter Last Name"
//     }
//     else if (empData.lastName.length <= 3)
//     {
//       errors.lastName ='name Cannot be Exceed 3 Characters'
//     }
//     if (!empData.date) {
//       errors.date = "Please Select Birthdate"
//     }
//   if (!empData.email) {
//     errors.email = 'Please Enter Email ID';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(empData.email)) {
//     errors.email = 'Invalid email address';
//   }
//   if (!empData.phone) {
//     errors.phone = 'Please Enter Mobile Number';
//   } else if (empData.phone.length < 10 ) {
//     errors.phone = 'Invalid Mobile Number';
//     }
//     if (!empData.gender) {
//       errors.phone = 'Please select Gender';
//     }
//     if (!empData.password) {
//       errors.password = 'Please Enter Password';
//     }
//     else if (empData.password.length < 6) {
//       errors.password = 'Invalid Password';
//     }

//     if (!empData.confirm_password) {
//       errors.password = 'Please Enter Password';
//     }
//     else if (empData.confirm_password.length < 6) {
//       errors.password = 'Invalid Password';
//     }
//     return errors;
//   }

//   const classes = useStyles();
//   const [users, setUsers] = useState({

//     firstName:"",
//     lastName:'',
//     email:'',
//     phone:'',
//     date:'',
//     gender:'',
//     password:'',
//     confirm_password:''

//   });
//   console.log("users", users);

//   const formik = useFormik({
//     initialValues: {
// users
//     },
//     validate: validation,
//     onSubmit: values=>{
//       alert(JSON.stringify(values));
//     }
//   });

//   const { firstName, lastName, email, phone, date, gender, password, confirm_password } = users;

//   const handleChange = e => setUsers({ ...users, [e.target.name]: e.target.value });

//   const onSubmit = e => {
//     e.preventDefault();

//     axios.post('http://localhost:5000/api/users',users)
//     .then((response)=>{
//     if (firstName === "" || lastName === '' || email === ''|| phone === ''|| date === ''|| gender === ''|| password === '' || confirm_password === '') {
//     console.log('Please enter all fields', 'danger');
//     } else if (password !== confirm_password) {
//     console.log('Passwords do not match', 'danger');
//     }
//       console.log(response)

//     })
//       .catch(error => {
//       console.log(error)
//     })
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />

//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form}  onSubmit={onSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 name="firstName"
//                 variant="outlined"
//                 required
//                fullWidth
//                 id="firstName"
//                 label="First Name"
//                 value ={values.firstName}
//                onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 autoFocus
//               />
//               {formik.touched.firstName && formik.errors.firstName ? <span style={{color:'red'}}>{formik.errors.firstName}</span> : null}
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                   name="lastName"
//                 value={formik.values.lastName}

//             //    onChange={onChange}
//                  onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 autoComplete="lastname"

//               />
//               {formik.touched.lastName && formik.errors.lastName ? <span style={{color:'red'}}>{formik.errors.lastName}</span> : null}

//                         </Grid>
//                       <Grid item xs={12} sm={6}>
//                       <TextField
//                       id="date"
//                       label="Birthday"
//                       type="date"
//                   name="date"
//                   value={formik.values.date}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                       className={classes.textField}
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//               />

//               {formik.touched.date && formik.errors.date ? <span style={{color:'red'}}>{formik.errors.date}</span> : null}

//             </Grid>
//             <Grid item xs={12} sm={6}>
//             <FormLabel component="legend">Gender</FormLabel>
//             <RadioGroup aria-label="gender" name="gender" value={formik.values.gender}   onChange={formik.handleChange} onBlur={formik.handleBlur}>
//               <FormControlLabel value="female" control={<Radio />}  label="Female" />
//                 <FormControlLabel value="male" control={<Radio />}  label="Male" />

//               </RadioGroup>
//               {formik.touched.gender && formik.errors.gender ? <span style={{color:'red'}}>{formik.errors.gender}</span> : null}

//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.email && formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : null}

//             </Grid>
//             <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               required
//               fullWidth
//               id="phone"
//               label="Phone Number"
//                 name="phone"
//                 value={formik.values.phone}
//                   autoComplete="Phone"
//                   onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.phone && formik.errors.phone ? <span style={{color:'red'}}>{formik.errors.phone}</span> : null}

//                       </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                   autoComplete="current-password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//               />
//               {formik.touched.password && formik.errors.password ? <span style={{color:'red'}}>{formik.errors.password}</span> : null}
//             </Grid>
//             <Grid item xs={12}>
//             <TextField
//               variant="outlined"
//               required
//               fullWidth
//               name="confirm_password"
//               label="Confirm Password"
//               type="confirm_password"
//               id="confirm_password"
//               autoComplete="current-password"
//               value={formik.values.confirm_password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.confirm_password && formik.errors.confirm_password ? <span style={{color:'red'}}>{formik.errors.confirm_password}</span> : null}

//                     </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}

//           >
//             Sign Up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link href="#" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={5}>
//       <Copyright />
//       </Box>

//     </Container>
//   );
//   //email Cheack box and used Verification
//   // <Grid item xs={12}>
//   //             <FormControlLabel
//   //               control={<Checkbox value="allowExtraEmails" color="primary" />}
//   //               label="I want to receive inspiration, marketing promotions and updates via email."
//   //             />
//   //           </Grid>
// }
import react, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import { useSnackbar } from 'notistack';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//const { setAlert } = alertContext;
//import alertContext from '../Alert/alertContext';
import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
// /import Snackbar from '@material-ui/core/Snackbar';
//import { TextField, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useHistory } from 'react-router-dom';
const RegisterPage = () => {
  const [values, setValues] = useState({});

  // const onSubmit  =(e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:5000/api/users', users)
  //     .then((response) => {
  //       console.log('Please enter all fields', 'danger');
  //     })
  //     .catch(error => {
  //       console.log(error)

  //     })
  //  }
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  //   useEffect(() => {
  //     // POST request using axios inside useEffect React hook
  //     const reg = { users };
  //     axios.post('http://localhost:5000/api/users', reg)
  //         .then(response => setUsers(response.data));

  // // empty dependency array means this effect will only run once (like componentDidMount in classes)
  // // }, []);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/');
    }
  }, []);

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log({ e });
    let formData = new FormData();
    Object.keys(e).forEach((fieldName) => {
      console.log(fieldName, e[fieldName]);
      formData.append(fieldName, e[fieldName]);
    });

    // const formData = new FormData();
    // formData.append('email', e.email);
    // formData.append('firstName', e.firstName);
    // formData.append('password', e.password);
    // formData.append('lastName', e.lastName);
    // formData.append('date', e.date);
    // formData.append('gender', e.gender);
    // formData.append('phone', e.phone);
    // formData.append('confirm_password', e.confirm_password);
    // formData.append('profilefile', e.profilefile);
    // console.log({ formData });

    axios
      .post('http://localhost:5000/api/users', formData)
      .then((res) => {
        console.log('response', res);
        //  alert(res.data.msg)
        history.push('/');
        enqueueSnackbar('User Are Register');
      })
      .catch((error) => {
        enqueueSnackbar('Use Different Email Id');
        console.log(error);
      });

    // const responseJson = await response.json()
    // if (response.status != 200)
    // {
    //   console.log("User are Register" ,responseJson)
    //   }
    return formData;
  };

  // const handleChange = e => setValues({ ...values, [e.target.name]: e.target.value });

  // const [state, setState] = useState({
  //   open: false,
  //   vertical: 'top',
  //   horizontal: 'center',
  // });

  // const { vertical, horizontal, open } = state;

  // const handleClick = (newState) => () => {
  //   setState({ open: true, ...newState });
  // };
  // const handleClose = () => {
  //   setState({ ...state, open: false });
  //   };

  //  const handleChange = e => setUsers({ ...users, [e.target.name]: e.target.value });
  //   const handleChange  = e => {
  //     setValues({ ...values, [e.target.name]: e.target.value });
  // };
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            date: '',
            gender: '',
            confirm_password: '',
            profilefile: '',
            phone: '',
          }}
          validate={(values) => {
            const errors = {};
            // firstName
            if (!values.firstName) {
              errors.firstName = 'Please Enter First Name';
            }
            // Email
            if (!values.email) {
              errors.email = 'Please Enter EmailID';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Please Enter EmailID Type( xyz@gmail.com))';
            }
            // password
            if (!values.password) {
              errors.password = 'Please Enter password';
            }
            // confirm_password
            if (!values.confirm_password) {
              errors.confirm_password = 'Please Enter confirm password';
            }
            // password should match with confirm_password
            if (values.password !== values.confirm_password) {
              errors.password = 'Confirm Password And Password are Not same';
            }
            // phone
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(values.phone)) {
              errors.phone = 'Please Enter Phone Number';
            } else if (values.phone.length !== 10) {
              errors.phone = 'Please enter valid phone number.';
            }
            //
            if (!values.date) {
              errors.date = 'Please select Birthdate';
            }
            //
            if (!values.lastName) {
              errors.lastName = 'Please Enter LastName';
            }
            //
            if (!values.gender) {
              errors.gender = 'Please Select Gender';
            }
            return errors;
          }}
          // onSubmit={(values, { setSubmitting }) => {
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //   }, 400);
          // }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              {console.log('values', values)}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='firstName'
                    name='firstName'
                    variant='outlined'
                    fullWidth
                    label='First Name'
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />

                  {errors.firstName && touched.firstName && errors.firstName}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant='contained' component='label'>
                    Upload File
                    <input
                      id='file'
                      name='profilefile'
                      values={values.profilefile}
                      type='file'
                      hidden
                      onChange={(event) => {
                        setFieldValue(
                          'profilefile',
                          event.currentTarget.files[0]
                        );
                      }}
                      className='form-control'
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name='lastName'
                    variant='outlined'
                    fullWidth
                    label='Last Name'
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />
                  {errors.lastName && touched.lastName && errors.lastName}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='date'
                    label='Date'
                    type='date'
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel component='legend'>Gender</FormLabel>
                  <RadioGroup
                    aria-label='gender'
                    name='gender'
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value='female'
                      control={<Radio />}
                      label='Female'
                    />
                    <FormControlLabel
                      value='male'
                      control={<Radio />}
                      label='Male'
                    />
                  </RadioGroup>
                  {touched.gender && errors.gender ? (
                    <span style={{ color: 'red' }}>{errors.gender}</span>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    variant='outlined'
                    fullWidth
                    label='Email Address'
                  />
                  {errors.email && touched.email && errors.email}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    label='Phone Number'
                    name='phone'
                    value={values.phone}
                    autoComplete='Phone'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && errors.phone && touched.phone ? (
                    <span style={{ color: 'red' }}>{errors.phone}</span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Password'
                    type='password'
                    variant='outlined'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Confirm Password'
                    type='password'
                    variant='outlined'
                    name='confirm_password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                  />

                  {errors.confirm_password &&
                    touched.confirm_password &&
                    errors.confirm_password}
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Submit
                </Button>
                <Grid item>
                  <Link href='/' variant='body2'>
                    {'Do have an account ? Login'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default RegisterPage;
