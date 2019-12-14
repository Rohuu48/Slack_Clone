import React from "react";
import SideDrawer from "./SideDrawer";
import { connect } from "react-redux";

import LeftDrawer from "./LeftDrawer";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { bindActionCreators } from "redux";
import {
  login,
  addtodb,
  createRooms,
  getRooms,
  getSkills,
  addSkillstodb,
  getUser
} from "../../actions/actions";
import firebase from "../firebase";
const mapStateToProps = store => {
  return {
    users: store.users,
    rooms: store.rooms
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login,
      createRooms,
      getRooms,
      addSkillstodb,
      getSkills,
      addtodb,
      getUser
    },
    dispatch
  );
};

class Homepage extends React.Component {
  constructor() {
    super();
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date;
    this.state = {
      msg: "",
      dateTime: dateTime
    };
  }
  componentDidMount() {
    this.props.login(this.props.match.params.id);
    this.props.getRooms(this.props.match.params.id);
    this.props.getSkills(this.props.match.params.id);
    this.props.getUser(this.props.match.params.id);
    this.setState({
      name: "Rohit"
    });
    var today = new Date();
    if (today.getHours() < 11) {
      this.setState({
        msg: "Good Morning"
      });
    } else if (today.getHours() > 11 && today.getHours() < 17) {
      this.setState({
        msg: "Good Afternoon"
      });
    } else {
      this.setState({
        msg: "Good Evening"
      });
    }
    console.log("Show this=>", this.props.location.state);
    setTimeout(() => {
      console.log(this.props.users, this.props.rooms.allrooms);
    }, 2000);
  }
  signout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        //this.props.history.push("/login");
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  render() {
    return (
      <Grid>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <SideDrawer
            createRooms={this.props.createRooms}
            getRooms={this.props.getRooms}
            addSkillstodb={this.props.addSkillstodb}
            addtodb={this.props.addtodb}
            allrooms={this.props.rooms.allrooms}
            users={this.props.users}
            getSkills={this.props.getSkills}
            mail={this.props.match.params.id}
            getUser={this.props.getUser}
            msg={this.state.msg}
            name={this.props.location.state.name[0].name}
          />

          <span style={{ position: "fixed", right: "0", top: "10px" }}>
            <LeftDrawer />
          </span>
        </div>
      </Grid>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
