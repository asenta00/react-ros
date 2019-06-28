import React, {Component} from "react";
import "./App.css";
import ROSLIB from 'roslib';
import Controller from "./Controller";
import UrlForm from "./UrlForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      connected: false
    }
  }

  ROSConnect = () => {
    try {
      this.ros = new ROSLIB.Ros({url : this.state.url});
      this.ros.on('connection', () => {
        console.log('Connected to websocket server.');
        this.setState({ connected:true })
      });
      this.ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error);
      });
    }
    catch {}
  }

  ROSMove = (direction) => {
    console.log(direction);
    const msg = {
      linear: { x: 0.0, y: 0.0, z: 0.0 },
      angular: { x: 0.0, y: 0.0, z: 0.0 },
    }

    const cmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });

    switch(direction){
      case "up": 
        msg.linear.x = 2.0; 
        break;
      case "down": 
        msg.linear.x = -2.0; 
        break;
      case "left":
        msg.angular.x = 2.0
        break;
      case "right":
        msg.angular.x = -2.0
        break;
      default:
    }

    const twist = new ROSLIB.Message(msg);
    cmdVel.publish(twist);
  }

  changeUrl = (e) => this.setState({url: e.target.value});

  render() {
    console.log(this.state.url);
    return (
      <div className="App">
        <div className="main">
        {/* <button type="button" className="btn btn-secondary" onClick={() => this.setState({connected:!this.state.connected})}>mock connection</button> */}
          <div className="logo">ReactROS</div>
          {this.state.connected ? 
            <Controller move={this.ROSMove}/>:
            <UrlForm changeUrl={this.changeUrl} ROSConnect={this.ROSConnect}/>
          }
        </div>
      </div>
    );
  }
}

export default App;