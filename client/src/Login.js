import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  TextField,
  CssBaseline,
  InputAdornment,
  Link,
  Icon,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    fontFamily: "OpenSans",
    fontWeight: "600",
    fontStyle: "normal",
  },
  image: {
    backgroundImage: `linear-gradient(to bottom, RGBA(58, 141, 255, .85), RGBA(134, 185, 255, .85)),url('${process.env.PUBLIC_URL}/bg-img.png')`,
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  }
}));

const Login = (props) => {
  const classes = useStyles();

  const history = useHistory();
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
      <Grid item xs={12} sm={4} md={5} className={classes.image}>
        <Grid
          container
          className={classes.pictureText}
          alignItems="center"
          justify="center"
          align="center"
        >
          <Grid item xs={4} sm={6} md={6}>
            <Icon>
              <img
                src={`${process.env.PUBLIC_URL}/bubble.svg`}
                alt="Chat Bubble"
              />
            </Icon>
            <h1>Converse with anyone with any language</h1>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} md={7} className={classes.test}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={0}
          className={classes.topRow}
        >
          <Grid item xs={4} sm={4} md={4}>
            <Typography>Don't have an account?</Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button
              className={classes.registerButton}
              onClick={() => history.push("/register")}
              type="submit"
              size="large"
              color="primary"
              fullwidth
            >
              Create account
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.formBack}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Grid container justify="center">
              <Grid
                item
                xs={8}
                sm={8}
                md={8}
              >
                <h1>Welcome back!</h1>
                <form className={classes.form} onSubmit={handleLogin}>
                  <Grid container justify="center">
                    <Grid item xs={12} sm={12} md={12}>
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
                    <Grid item xs={12} sm={12} md={12}>
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
                  <Grid container justify="center" className={classes.ButtonGrid}>
                    <Grid item xs={4} sm={4} md={4}>
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
            {/* <form className={classes.form} onSubmit={handleLogin}>
              <Grid>
                <h1>Welcome back!</h1>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12} sm={8} md={8}>
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
                <Grid item xs={12} sm={8} md={8}>
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
              <Grid container justify="center">
                <Grid item xs={4} sm={4} md={4}>
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
            </form> */}
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
