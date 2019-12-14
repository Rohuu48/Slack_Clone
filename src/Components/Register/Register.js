import React from "react";
import "./Register.css";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import firebase from "../firebase";
import Nav from "../Example";
import { logincheck } from "../../actions/actions";

const mapStateToProps = store => {
  return {
    a: store.a
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logincheck
    },
    dispatch
  );
};
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      email: "",
      name: "",
      data: "",
      dataem: "",
      password: "",
      confirmpass: "",
      message: "",
      error: null,
      valid: true
    };
  }
  updateInput = e => {
    this.props.logincheck(this.state.email);
    if (this.props.a) {
      this.setState({
        valid: false
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
      console.log(this.state.email);
    }
  };
  show = () => {
    const db = firebase.firestore();
    db.collection("users")
      .get()
      .then(query => {
        let entry = [];
        query.forEach(doc => {
          entry.push(doc.data());
        });
        this.setState({ user: entry });
      });
  };
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  handleConfirmPassword = event => {
    this.setState({ confirmpass: event.target.value });
    if (
      event.target.value.length > this.state.password.length ||
      (event.target.value.length === this.state.password.length &&
        event.target.value !== this.state.password)
    ) {
      this.setState({
        message: "Passwords don't match"
      });
      setTimeout(() => {
        this.setState({
          confirmpass: "",
          message: ""
        });
      }, 2000);
    }
  };

  validate = () => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if (reg.test(this.state.email) && this.state.name.length > 1) {
      console.log("true");
      return true;
    } else {
      console.log("false");

      return false;
    }
  };

  addUser = e => {
    e.preventDefault();
    var a = this.validate();

    if (a) {
      const db = firebase.firestore();

      const userRef = db.collection("users").add({
        name: this.state.name,
        email: this.state.email
      });
      const { email, password } = this.state;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {})
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
          this.setState({ error: error });
        });
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert("Email Verification Sent!");
          // [END_EXCLUDE]
        });
      // [END sendemailverification]
      alert("User registered");

      this.setState({
        name: "",
        email: "",
        password: "",
        confirmpass: ""
      });
      this.props.history.push("/login");
    } else {
      this.call();
    }
  };
  call = () => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(this.state.email) === false) {
      this.setState({
        dataem: "Invalid Email"
      });
    }
    if (this.state.name.length < 2) {
      this.setState({
        data: "Wrong Name"
      });
    }
  };
  render() {
    if (this.state.valid) {
      return (
        <div>
          <Nav />

          <div id="wrapper">
            <div className="form-container">
              <span className="form-heading">Sign Up</span>
              <form onSubmit={this.addUser}>
                <div className="input-group m-b-20">
                  <input
                    type="text"
                    name="name"
                    placeholder="Username..."
                    value={this.state.name}
                    onChange={this.updateInput}
                    required
                  />
                  <span className="validation">{this.state.data}</span>
                  <span className="bar"></span>
                </div>
                <div className="input-group m-b-20">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email..."
                    value={this.state.email}
                    onChange={this.updateInput}
                    required
                  />
                  <span className="validation">{this.state.dataem}</span>
                  <span className="bar"></span>
                </div>
                <div className="input-group m-b-20">
                  <input
                    placeholder="Password..."
                    onChange={this.handlePasswordChange}
                    name="password"
                    type="password"
                    value={this.state.password}
                    required
                  />
                  <span className="bar"></span>
                </div>
                <div className="input-group m-b-20">
                  <input
                    type="text"
                    placeholder="Confirm password..."
                    name="password"
                    type="password"
                    value={this.state.confirmpass}
                    onChange={this.handleConfirmPassword}
                    required
                  />
                  <span className="validation">{this.state.message}</span>

                  <span className="bar"></span>
                </div>
                <div className="input-group m-b-25">
                  <button type="submit">Go</button>
                </div>
                <div className="switch-login">
                  <Link to="/login">Already have an account? Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      alert("sassa");
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
