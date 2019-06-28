import React, {Component} from "react";
import "./App.css";
import ROSLIB from 'roslib';
import Controller from "./Controller";

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
      const ros = new ROSLIB.Ros({url : this.state.url});
      ros.on('connection', () => {
        console.log('Connected to websocket server.');
        this.setState({ connected:true })
      });
      ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error);
      });
    }
    catch {}
  }

  ROSMove = (direction) => {
    console.log(direction);
    const msg = {
      linear: { x: 0.0, y: 0.0, z: 0.0 },
      agular: { x: 0.0, y: 0.0, z: 0.0 },
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
    return (
      <div className="App">
        <div className="main">
          <div className="logo">ReactROS</div>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Type ROSBridge URL" onChange={this.changeUrl}/>
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.ROSConnect}>Connect</button>
            </div>
          </div>
          <Controller move={this.ROSMove}/>
        </div>
      </div>
    );
  }
}

export default App;