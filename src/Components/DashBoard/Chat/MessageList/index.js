import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "../../../firebase";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";

import "./MessageList.css";
import { addTextMsg } from "../../../../actions/actions";

const mapStateToProps = store => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTextMsg
    },
    dispatch
  );
};

class MessageList extends React.Component {
  constructor() {
    super();

    this.state = {
      message: "",
      mail: "",
      roomname: ""
    };
  }
  componentDidMount() {
    console.log();
  }
  changeTextInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton
              key="info"
              icon="ion-ios-information-circle-outline"
            />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{}</div>

        <div className="compose">
          <input
            type="text"
            className="compose-input"
            name="message"
            placeholder="Type a message, @name"
            value={this.state.message}
            onChange={this.changeTextInput}
          />
        </div>
        <button
          onClick={() =>
            this.props.addTextMsg(
              this.props.email,
              this.props.roomname,
              this.state.message
            )
          }
        >
          Add
        </button>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
