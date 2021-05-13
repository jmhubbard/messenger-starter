import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  TextField,
  CssBaseline,
  FormHelperText,
  Hidden
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/MainPageHeader/MainPageHeader";
import MainPageSidebar from "./components/MainPageSidebar/MainPageSidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    fontFamily: "OpenSans",
    fontWeight: "600",
    fontStyle: "normal",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  registerButton: {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    color: "#3A8DFF",
  },
  loginButton: {
    backgroundColor: "#3A8DFF",
    height: "60px"
  },
  topRow: {
    margin: "25px",
  },
  pictureText: {
    height: "100vh",
    color: "white",
  },

  ButtonGrid: {
    margin: "30px",
  },
  formHeader: {
    fontWeight: "600",
    fontStyle: "normal",
  },
  formGrid: {
    margin: "50px 0",
  },
  registerButtonGrid: {
    margin: "0 50px 0 0",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Hidden xsDown>
      <Grid item xs={false} sm={4} md={5}>
        <MainPageSidebar />
      </Grid>
      </Hidden>
      <Grid item xs={12} sm={8} md={7}>
        <Header
          message="Already have an account?"
          buttonPush="/login"
          buttonText="Login"
        />
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.formBack}
        >
          <Grid item xs={12}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.formGrid}
            >
              <Grid item xs={8}>
                <Typography variant="h5" className={classes.formHeader}>
                  Create an account.
                </Typography>
                <form className={classes.form} onSubmit={handleRegister}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <TextField
                        label="Username"
                        name="username"
                        type="text"
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <TextField
                        label="E-mail address"
                        name="email"
                        type="email"
                        required
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <TextField
                        label="Password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="password"
                        required
                        fullWidth
                        margin="normal"
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm Password"
                        aria-label="confirm password"
                        type="password"
                        inputProps={{ minLength: 6 }}
                        name="confirmPassword"
                        required
                        fullWidth
                        margin="normal"
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    justify="center"
                    className={classes.ButtonGrid}
                  >
                    <Grid item xs={4}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="primary"
                        fullWidth
                        className={classes.loginButton}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
