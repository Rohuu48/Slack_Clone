import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Nav from "../Example";
import { connect } from "react-redux";
import { getName } from "../../actions/actions";
import { bindActionCreators } from "redux";
import { Container, Flex, Box, Input, Button, Subhead, Text } from "rebass";
import firebase from "../firebase";

const mapStateToProps = store => {
  return {
    name: store.name
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getName
    },
    dispatch
  );
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };
  passwordreset = () => {
    const { email } = this.state;

    // [START sendpasswordemail]
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert("Password Reset Email Sent!");
        // [END_EXCLUDE]
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == "auth/invalid-email") {
          alert(errorMessage);
        } else if (errorCode == "auth/user-not-found") {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
  };
  handleInputChange = event => {
    this.props.getName(this.state.email);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push(`/home/${email}`, this.props.name);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        this.setState({ error: error });
      });
    firebase.auth().onAuthStateChanged(user => {
      // [START_EXCLUDE silent]

      // [END_EXCLUDE]
      if (user) {
        // User is signed in.
        var displayName = user.name;
        var email = user.email;
        var emailVerified = user.emailVerified;

        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(
          displayName,
          email,
          emailVerified,
          isAnonymous,
          uid,
          providerData
        );
      }
    });
  };
  render() {
    const { email, password, error } = this.state;

    return (
      <div>
        <Nav />

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleInputChange}
          />
          <button type="submit">Log In</button>
          <Link onClick={this.passwordreset}>Forgot password?</Link>
        </form>
        {error ? <h5>{error.message}</h5> : null}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
