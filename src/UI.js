import React from "react";
import "./UI.css";
import Nav from "./Components/Example";
const image = require("./showcase.jpg");
class UI extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div style={sectionStyle}></div>
        <h1>Just Slack It</h1>
      </div>
    );
  }
}
var sectionStyle = {
  width: "100%",
  height: "700px",
  filter: "blur(8px)",
  backgroundImage: `url(${image})`
};

export default UI;
