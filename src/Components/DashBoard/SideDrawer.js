import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { bindActionCreators } from "redux";
import { login } from "../../actions/actions";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddPicture from "./AddPicture";
import download from "../DashBoard/sidebar-1.jpg";

import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  primaryColor,
  primaryBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from "./material-dashboard-react";
import DashBoard from "./DashBoard";
import Rooms from "./Rooms";

const useStyles = makeStyles({
  fullList: {
    width: "auto"
  },
  button: {
    position: "fixed",
    width: "125px",
    height: "60px",
    top: "80px",
    right: "0px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "25px",
    border: "2 px solid yellow",
    textAlign: "center",
    boxShadow: "2px 2px 3px #999",
    opacity: "0.5"
  },
  drawerPaper: {
    display: "block",
    height: "50rem",

    backgroundSize: "cover",
    border: "none",
    opacity: "0.7",

    ...boxShadow,
    width: drawerWidth,

    "&,&:hover": {
      color: whiteColor
    }
  },

  img: {
    width: "35px",
    top: "22px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0"
  },

  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      backgroundColor: "yellow",
      color: "yellow"
    }
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    // backgroundColor: "transparent",
    ...defaultFont,
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: "blue"
    },
    "&:select": {
      backgroundColor: "yellow"
    }
  },
  itemLinkchange: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    // backgroundColor: "transparent",
    ...defaultFont,
    color: "white",

    backgroundColor: "yellow"
  },
  itemIcon: {
    width: "24px",
    height: "30px",
    fontSize: "24px",
    lineHeight: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
  },

  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    color: whiteColor
  },

  whiteFont: {
    color: whiteColor
  },
  purple: {
    backgroundColor: primaryColor[0],
    ...primaryBoxShadow,
    "&:hover,&:focus": {
      backgroundColor: primaryColor[0],
      ...primaryBoxShadow
    }
  },
  avatar: {
    backgroundColor: "red"
  },
  blue: {
    backgroundColor: infoColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(infoColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(infoColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: infoColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(infoColor[0]) +
        ",.2)"
    }
  },
  green: {
    backgroundColor: successColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(successColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(successColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: successColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(successColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ",.2)"
    }
  },
  orange: {
    backgroundColor: warningColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: warningColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.2)"
    }
  },
  red: {
    backgroundColor: dangerColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.2)"
    }
  }
});
function SideDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    profile: false,
    data: "",
    name: "",
    i: "",
    css: false,
    compo: "",
    mail: props.mail
  });
  const [component, setComponent] = React.useState("user");

  console.log(props.users.users[0]);

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    props.getUser(props.mail);
    props.getSkills(props.mail);
    setState({
      ...state,
      [side]: open,
      name: props.users.users[0].name,
      i: props.users.users[0].name.charAt(0).toUpperCase()
    });
  };
  console.log(props.allrooms);
  const roomList = side => (
    <div
      className={classes.drawerPaper}
      style={{
        backgroundImage: "url(" + download + ")",
        backgroundSize: "cover"
      }}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {props.allrooms.map((text, index) => (
          <ListItem
            className={classes.itemIconRTL}
            button
            key={text}
            onClick={() => setComponent(`${text}`)}
          >
            <ListItemText
              primary={text}
              onClick={() => {
                props.history.push(`/chat/${text}`, props.mail);
                console.log("HMMM", text, props.match.url);
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleClick = text => {
    setComponent(`${text}`);
    setState({
      css: true
    });
  };

  return (
    <div>
      <main
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundSize: "cover"
        }}
      >
        <div
          className={classes.drawerPaper}
          style={{
            backgroundImage: "url(" + download + ")",
            backgroundSize: "cover"
          }}
          role="presentation"
        >
          <CardHeader
            style={{ paddingTop: "30px", fontWeight: "bold", fontSize: "20px" }}
            avatar={
              <Avatar aria-label="recipe" style={{ backgroundColor: "red" }}>
                {props.name.charAt(0).toUpperCase()}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`${props.msg} ${props.name}`}
            //  subheader={this.state.date}
          />
          <Divider style={{ textDecoration: "underline" }} />
          <List>
            {[
              "Home",
              "DashBoard",
              "Profile",
              "Add Profile Picture",
              "Edit Profile",
              "Create Room"
            ].map((text, index) => (
              <ListItem
                className={classes.itemLink}
                button
                key={text}
                onClick={() => handleClick(text)}
              >
                <ListItemText
                  primary={text}
                  onClick={() => {
                    // check(text);
                    console.log("HMMM", text, props.match.url);
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
        <span style={{ right: "10" }}>
          <Button
            className={classes.button}
            onClick={toggleDrawer("right", true)}
          >
            Active Rooms
          </Button>
        </span>
        <SwipeableDrawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          {roomList("right")}
        </SwipeableDrawer>
        <div style={{ marginTop: "80px" }}>
          {component === "Profile" ? (
            <Profile
              users={props.users}
              getSkills={props.getSkills}
              mail={props.mail}
              getUser={props.getUser}
            />
          ) : component === "Edit Profile" ? (
            <EditProfile
              getSkills={props.getSkills}
              mail={props.mail}
              getUser={props.getUser}
              createRooms={props.createRooms}
              addtodb={props.addtodb}
              addSkillstodb={props.addSkillstodb}
              getRooms={props.getRooms}
              users={props.users}
            />
          ) : component === "Add Profile Picture" ? (
            <AddPicture />
          ) : component === "DashBoard" ? (
            <DashBoard />
          ) : component === "Create Room" ? (
            <Rooms
              createRooms={props.createRooms}
              getRooms={props.getRooms}
              users={props.users}
            />
          ) : (
            "join a workspace"
          )}
        </div>
      </main>
    </div>
  );
}
export default withRouter(SideDrawer);
