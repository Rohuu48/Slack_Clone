import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import search from "../../Components/search.jpeg";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import firebase from "../firebase";
const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: "10px",
    width: "auto",
    fontFamily: "Times New Roman"
  },
  button: {
    margin: theme.spacing(1)
  }
}));
function Rooms(props) {
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addRoom = () => {
    console.log("Created Room");
    const db = firebase.firestore();
    props.getRooms(props.users.users[0].email);
    props.createRooms(values.roomname, props.users.users[0].email);
  };

  const [values, setValues] = React.useState({
    roomname: ""
  });

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h3
        style={{
          fontSize: "20px",
          color: "red",
          padding: "30px"
        }}
      >
        Create Rooms
      </h3>
      <Grid style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <form style={{ marginLeft: "10px" }}>
            <label>Room Name</label>
            <input
              placeholder="Search.."
              type="text"
              value={values.roomname}
              onChange={handleChange("roomname")}
              style={{
                backgroundColor: "white",
                backgroundImage: "url(" + search + ")",
                backgroundSize: "25px",
                backgroundPosition: "10px 10px",
                backgroundRepeat: "no-repeat",
                padding: "12px 20px 12px 40px",
                width: "100%",
                boxSizing: "border-box",
                border: "2px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",

                "&:focus": {
                  border: "3px solid red"
                }
              }}
            />{" "}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={addRoom}
            >
              Create
            </Button>
          </form>
        </div>
      </Grid>
    </div>
  );
}

export default Rooms;
