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
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import firebase from "../firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addtodb, createRooms, addSkillstodb } from "../../actions/actions";

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: "100vh"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    flexGrow: 1,
    alignContent: "center",
    marginLeft: "100px",
    width: "auto"
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
    maxWidth: 500
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%"
  }
}));

function getSteps() {
  return [
    "Set up your personal information",
    "Set up your skills",
    "Add profile picture (Skip to set it up later)",
    "Create or join rooms"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Add your name, location....";
    case 1:
      return "Set up skills";
    case 2:
      return "Put up a display picture!";
    case 3:
      return "Become part of rooms and share";
    default:
      return "Unknown stepIndex";
  }
}

function EditProfile(props) {
  console.log(
    props.users,
    props.users.alluser,
    props.users.users[0].name,
    props.users.users[0].email,
    props.users.users[0].age
  );
  const name = props.users.users[0].name;
  const mail = props.users.users[0].email;
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState({
    age: props.users.users[0].age,
    gender: props.users.users[0].gender,
    parent: props.users.users[0].parent,
    address: props.users.users[0].address,
    institute: props.users.users[0].institute,
    contact: props.users.users[0].contact,
    pherror: "",
    edu: "",
    field: "",
    github: "",
    job: "",
    room: ""
  });
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const addSkills = () => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(query => {
        query.forEach(doc => {
          if (doc.data().email === mail) {
            props.addSkillstodb(values, doc);
          }
        });
      });
    setTimeout(() => {
      handleNext();
    }, 2000);
  };
  const addUser = () => {
    const db = firebase.firestore();
    const a = validate();
    if (a) {
      db.collection("users")
        .get()
        .then(query => {
          query.forEach(doc => {
            if (doc.data().email === mail) {
              props.addtodb(values, doc.id, doc.data().email, doc.data().name);
            }
          });
        });
      props.getUser(props.mail);
      setValues({ ...values, pherror: "" });
      console.log("Added");
      setTimeout(() => {
        handleNext();
      }, 2000);
    } else {
      setValues({ ...values, pherror: "Invalid Phone No" });
    }
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value, pherror: "" });
  };

  const validate = () => {
    const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (re.test(values.contact)) {
      return true;
    }
  };

  const addRoom = () => {
    const db = firebase.firestore();
    props.getRooms(props.users.users[0].email);
    props.createRooms(values.room, props.users.users[0].email);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}></Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
      {console.log(steps.map(label => label))}
      {console.log(activeStep)}

      {activeStep === 0 ? (
        <div>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              disabled
              id="standard-disabled"
              label="Name"
              defaultValue={name}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              disabled
              id="standard-disabled"
              label="Email-Id"
              defaultValue={mail}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Age"
              className={classes.textField}
              value={values.age}
              onChange={handleChange("age")}
              margin="normal"
            />
            <TextField
              id="standard-uncontrolled"
              label="Gender"
              defaultValue={values.gender}
              onChange={handleChange("gender")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              required
              id="standard-required"
              label="Address"
              value={values.address}
              onChange={handleChange("address")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              required
              id="standard-required"
              label="Guardian's Name"
              value={values.parent}
              onChange={handleChange("parent")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              required
              id="standard-required"
              label="Institute"
              value={values.institute}
              onChange={handleChange("institute")}
              className={classes.textField}
              margin="normal"
            />

            <TextField
              required
              id="standard-required"
              label="Contact No."
              value={values.contact}
              onChange={handleChange("contact")}
              className={classes.textField}
              margin="normal"
              placeholder={`${values.pherror}`}
            />
            {values.pherror}
            <br />
            <Button onClick={addUser}>Submit</Button>
          </form>
        </div>
      ) : activeStep == 1 ? (
        <div>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="standard-name"
              label="Educational Qualifications"
              className={classes.textField}
              value={values.edu}
              onChange={handleChange("edu")}
              margin="normal"
            />
            <TextField
              id="standard-uncontrolled"
              label="Field of Interest"
              value={values.field}
              onChange={handleChange("field")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="standard-uncontrolled"
              label="Github Link(if any)"
              value={values.github}
              onChange={handleChange("github")}
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="standard-required"
              label="Job Experience(if any)"
              value={values.job}
              onChange={handleChange("job")}
              className={classes.textField}
              margin="normal"
            />

            <br />
            <Button onClick={addSkills}>Submit</Button>
          </form>
        </div>
      ) : activeStep === 2 ? (
        <div>
          <input type="file" />
        </div>
      ) : activeStep === 3 ? (
        <div>
          <TextField
            id="standard-required"
            label="Room Name"
            value={values.room}
            onChange={handleChange("room")}
            className={classes.textField}
            margin="normal"
          />
          <button onClick={addRoom}>Create</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default EditProfile;
