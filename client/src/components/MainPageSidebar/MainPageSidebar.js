import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Typography,
    Icon,
  } from "@material-ui/core";
import sidebarPicture from '../../assets/bg-img.png';
import chatBubbleIcon from '../../assets/bubble.svg';


const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        fontFamily: "OpenSans",
        fontWeight: "600",
        fontStyle: "normal",
      },
      image: {
        backgroundImage: `linear-gradient(to bottom, RGBA(58, 141, 255, .85), RGBA(134, 185, 255, .85)),url('${sidebarPicture}')`,
    
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
        backgroundImage: `linear-gradient(to bottom, RGBA(58, 141, 255, .85), RGBA(134, 185, 255, .85)),url('${sidebarPicture}')`,
    
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        
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
      }
    
}));

const MainPageSidebar = () => {
  const classes = useStyles();

  return (
    <Grid
    container
    className={classes.pictureText}
    alignItems="center"
    justify="center"
    align="center"
  >
    <Grid item xs={9} sm={9} md={9}>
      <Icon>
        <img
          src={chatBubbleIcon}
          alt="Chat Bubble"
        />
      </Icon>
      <Typography variant="h4">Converse with anyone with any languages</Typography>
    </Grid>
  </Grid>

  );
};

export default MainPageSidebar;
