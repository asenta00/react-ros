import React, {Component} from "react";
import "./App.css";

class Simulation extends Component {
  constructor(props) {
    super(props);
    this.state={
      x: 5.5,
      y: 5.5
    }
  }

  render() {
    return (
      <div className="simulation">
        <div style={{ left: `${(this.props.x-0.5)*10}%`, bottom: `${(this.props.y-0.5)*10}%` }} className="turtle"/>
      </div>
    );
  }
}

export default Simulation;