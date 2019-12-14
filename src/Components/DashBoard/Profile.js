import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import download from "./download.jpeg";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

    width: "90%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
    height: 500,
    maxHeight: 500
  },
  image: {
    width: 256,
    height: 256
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%"
  },
  image: {
    alignContent: "center",
    alignItems: "center"
  }
}));

function Profile(props) {
  console.log(props.users, props.users.users[0].name, props.users.allskills);
  //props.getUser(props.mail);
  //props.getSkills(props.mail);
  const classes = useStyles();

  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center">
      <Grid item>
        <div className={classes.img}>
          <Avatar
            alt={`${props.users.name}`}
            src={download}
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Typography gutterBottom variant="subtitle1">
            {props.users.alluser[0].name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {props.users.alluser[0].institute}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Age:{props.users.alluser[0].age}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {props.users.allskills[0].field}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {props.users.allskills[0].edu}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default Profile;
