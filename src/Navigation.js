import React from "react";
import Demo from "./Demo";
import { Route, Switch, BrowserRouter, Router } from "react-router-dom";
import { Container, Row } from "reactstrap";
import UI from "./UI";
import { createBrowserHistory } from "history";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import About from "./Components/About";
import Support from "./Components/Support";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Components/DashBoard/DashBoard";
import Profile from "./Components/DashBoard/Profile";
import HomepageLogin from "./Components/DashBoard/HomepageLogin";
import Chatroom from "./Components/DashBoard/Chat/Chatroom";
export const history = createBrowserHistory();
class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={UI} />
            <Route path="/about" exact component={About} />
            <Route path="/support" exact component={Support} />
            <Route path="/register" exact component={Register} />
            <Route
              authenticated={this.props.authenticated}
              path="/login"
              exact
              component={Login}
            />
            <Route path="/demo" component={Demo} />
            <Route
              authenticated={this.props.authenticated}
              path="/home/:id"
              component={HomepageLogin}
            />
            <Route
              authenticated={this.props.authenticated}
              exact
              path="/dashboard/:id/profile"
              render={() => <Profile />}
            />
            <Route
              authenticated={this.props.authenticated}
              path="/chat/:id"
              component={Chatroom}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Navigation;
