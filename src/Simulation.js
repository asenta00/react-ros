import React, {Component} from "react";
import "./App.css";

class Simulation extends Component {
  constructor(props) {
    super(props);
    this.state={
      x: 240,
      y: 160
    }
  }

  componentWillReceiveProps() {
    const x = 480*(this.props.x-0.5)/10;
    const y = 320-320*(this.props.y-0.5)/10;
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(this.state.x, this.state.y);
    ctx.lineTo(x, y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    this.setState({ x, y })
  }

  render() {
    return (
      <div className="simulation">
        <canvas id="myCanvas" width="480px" height="320px" style={{}}/>
        <div style={{ left: `${(this.props.x-0.5)*10}%`, bottom: `${(this.props.y-0.5)*10}%` }} className="turtle"/>
      </div>
    );
  }
}

export default Simulation;