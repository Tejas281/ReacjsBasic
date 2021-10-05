import  {makeStyles } from "@material-ui/core/styles";
import {Avatar,Button,TextField,Link,Grid,Typography,Container,Radio,RadioGroup,FormLabel,FormControlLabel} from "@material-ui/core";
import { useSnackbar } from "notistack";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import InputPassword from "./InputPassword";
const RegisterPage = () => {
  const [passwordvalues, setPasswrodValues] = useState({
    password: "",
    showPassword: false,
  });

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
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);

  const handleClickShowPassword = () => {
    setPasswrodValues({
      ...passwordvalues,
      showPassword: !passwordvalues.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (e) => {
    console.log({ e });
    let formData = new FormData();
    Object.keys(e).forEach((fieldName) => {
      console.log(fieldName, e[fieldName]);
      formData.append(fieldName, e[fieldName]);
    });
    axios
      .post("http://localhost:5000/api/users", formData)
      .then((res) => {
        console.log("response", res);
        history.push("/");
        enqueueSnackbar("User Are Register");
      })
      .catch((error) => {
        enqueueSnackbar("Use Different Email Id");
        console.log(error);
      });
    return formData;
  };
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            date: "",
            gender: "",
            confirm_password: "",
            profilefile: "",
            phone: "",
          }}
          validate={(values) => {
            const errors = {};
            // firstName
            if (!values.firstName) {
              errors.firstName = "Please Enter First Name";
            }
            // Email
            if (!values.email) {
              errors.email = "Please Enter EmailID";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Please Enter EmailID Type( xyz@gmail.com))";
            }
            // password
            if (!values.password) {
              errors.password = "Please Enter password";
            }
            // confirm_password
            if (!values.confirm_password) {
              errors.confirm_password = "Please Enter confirm password";
            }
            // password should match with confirm_password
            if (values.password !== values.confirm_password) {
              errors.password = "Confirm Password And Password are Not same";
            }
            // phone
            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(values.phone)) {
              errors.phone = "Please Enter Phone Number";
            } else if (values.phone.length !== 10) {
              errors.phone = "Please enter valid phone number.";
            }
            //
            if (!values.date) {
              errors.date = "Please select Birthdate";
            }
            //
            if (!values.lastName) {
              errors.lastName = "Please Enter LastName";
            }
            //
            if (!values.gender) {
              errors.gender = "Please Select Gender";
            }
            return errors;
          }}
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
          }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              {console.log("values", values)}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />

                  {errors.firstName && touched.firstName && errors.firstName}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload File
                    <input
                      id="file"
                      name="profilefile"
                      values={values.profilefile}
                      type="file"
                      hidden
                      onChange={(event) => {
                        setFieldValue(
                          "profilefile",
                          event.currentTarget.files[0]
                        );
                      }}
                      className="form-control"
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    variant="outlined"
                    fullWidth
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />
                  {errors.lastName && touched.lastName && errors.lastName}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                  {touched.gender && errors.gender ? (
                    <span style={{ color: "red" }}>{errors.gender}</span>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    variant="outlined"
                    fullWidth
                    label="Email Address"
                  />
                  {errors.email && touched.email && errors.email}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={values.phone}
                    autoComplete="Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && errors.phone && touched.phone ? (
                    <span style={{ color: "red" }}>{errors.phone}</span>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <InputPassword
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && errors.password}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    name="confirm_password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                  />

                  {errors.confirm_password &&
                    touched.confirm_password &&
                    errors.confirm_password}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Do have an account ? Login"}
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
