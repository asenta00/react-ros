import React, {Component} from "react";
import "./App.css";
import ROSLIB from 'roslib';
import Controller from "./Controller";
import UrlForm from "./UrlForm";
import Simulation from "./Simulation";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: 'ws://localhost:9090',
      connected: false,
      error: false,
      x: 5.5,
      y: 5.5
    }
  }

  ROSConnect = () => {
    try {
      const ros = new ROSLIB.Ros({url : this.state.url});
      ros.on('connection', () => {
        console.log('Connected to websocket server.');
        this.setState({ connected:true });
        this.ROSTopic(ros);
      });
      ros.on('error', () => {
        const error = 'Error connecting to websocket server.'
        console.log(error);
        this.setState({ error });
      });
      ros.on('close', () => {
        console.log('Connection to websocket server closed.');
      });
    }
    catch {
      const error = 'Failed to construct websocket. The URL is invalid.'
      console.log(error);
      this.setState({ error });
    }
  }

  ROSTopic = (ros) => {
    this.cmdVel = new ROSLIB.Topic({
      ros: ros,
      name : 'turtle1/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });

    this.listener = new ROSLIB.Topic({
      ros : ros,
      name : 'turtle1/pose',
      messageType : 'turtlesim/Pose'
    });

    this.listener.subscribe((message) => {
      const { x, y } = message;
      if(this.state.x !== x) this.setState({ x });
      if(this.state.y !== y) this.setState({ y });
    });
  }

  ROSMove = (direction) => {
    const msg = {
      linear: { x: 0.0, y: 0.0, z: 0.0 },
      angular: { x: 0.0, y: 0.0, z: 0.0 },
    }

    switch(direction){
      case "up": 
        msg.linear.x = 2.0; 
        break;
      case "down": 
        msg.linear.x = -2.0; 
        break;
      case "left":
        msg.angular.z = 2.0
        break;
      case "right":
        msg.angular.z = -2.0
        break;
      default:
    }

    const twist = new ROSLIB.Message(msg);
    this.cmdVel.publish(twist);
  }

  changeUrl = (e) => this.setState({url: e.target.value});

  render() {
    return (
      <div className="App">
        <div className="main">
          <div className="logo">ReactROS</div>
          {this.state.connected ? 
            <div>
              <Controller move={this.ROSMove}/>
              <Simulation x={this.state.x} y={this.state.y} />
            </div> :
            <UrlForm url={this.state.url} changeUrl={this.changeUrl} ROSConnect={this.ROSConnect}/>
          }
          {this.state.error && (<div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>)}
        </div>
      </div>
    );
  }
}

export default App;