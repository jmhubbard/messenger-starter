import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    Button,
  } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  registerButton: {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    color: "#3A8DFF",
    height: "60px"

  },
  topRow: {
    margin: "25px",
  },
  registerButtonGrid: {
    margin: "0 50px 0 0",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { message, buttonPush, buttonText } = props;
  const history = useHistory();


  return (
    <Grid
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
      spacing={0}
      className={classes.topRow}
    >
      <Grid item xs={5} sm={4}>
        <Typography>{message}</Typography>
      </Grid>
      <Grid item xs={4} md={3} className={classes.registerButtonGrid}>
        <Button
          className={classes.registerButton}
          onClick={() => history.push(`${buttonPush}`)}
          type="submit"
          size="large"
          color="primary"
          fullWidth
        >
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
