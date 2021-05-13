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
      pictureText: {
        height: "100vh",
        color: "white",
        backgroundImage: `linear-gradient(to bottom, RGBA(58, 141, 255, .85), RGBA(134, 185, 255, .85)),url('${sidebarPicture}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      chatBubble: {
          margin: "50px 0",
      },
      chatBubbleTextGrid: {
          padding: "0 0 220px 0",
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
    <Grid item xs={9} className={classes.chatBubbleTextGrid}>
      <Icon>
        <img
          src={chatBubbleIcon}
          alt="Chat Bubble"
          className = {classes.chatBubble}
        />
      </Icon>
      <Typography variant="h4">Converse with anyone with any languages</Typography>
    </Grid>
  </Grid>

  );
};

export default MainPageSidebar;
