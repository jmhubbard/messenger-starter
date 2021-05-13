import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  TextField,
  CssBaseline,
  InputAdornment,
  Link,
  Hidden
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
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
  loginButton: {
    backgroundColor: "#3A8DFF",
    height: "60px"
  },

  buttonGrid: {
    margin: "30px 0 0 0",
  },
  formHeader: {
    fontWeight: "600",
    fontStyle: "normal",
  },
  formGrid: {
    margin: "50px 0",
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Hidden smDown>
      <Grid item xs={false} sm={4} md={5}>
        <MainPageSidebar />
      </Grid>
      </Hidden>
      <Grid item xs={12} sm={8} md={7}>
        <Header
          message="Don't have an account?"
          linkTo="/register"
          buttonText="Create account"
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
                  Welcome back!
                </Typography>
                <form className={classes.form} onSubmit={handleLogin}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <TextField
                        label="E-mail address"
                        name="username"
                        type="text"
                        required
                        autoFocus
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
                        name="password"
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography>
                                <Link href="#">Forgot?</Link>
                              </Typography>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justify="center"
                    className={classes.buttonGrid}
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
                        Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
