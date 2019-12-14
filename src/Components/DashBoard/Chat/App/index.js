import React from "react";
import Messenger from "../Messenger";
import { withRouter } from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state, this.props.match.params.id);
  }
  render() {
    return (
      <div className="App">
        <Messenger
          roomname={this.props.match.params.id}
          email={this.props.location.state}
        />
      </div>
    );
  }
}
export default withRouter(App);
