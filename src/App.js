import React, {Component} from "react";
import "./App.css";
import ROSLIB from 'roslib';
import Controller from "./Controller";
import UrlForm from "./UrlForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      url: 'ws://localhost:9090',
      connected: false,
      error: false
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
      ros.on('error', (error) => {
        console.log('Error connecting to websocket server: ', error);
        this.setState({ error: true });
      });
    }
    catch {
      console.log('Error connecting to websocket server');
      this.setState({ error:true });
    }
  }

  ROSTopic = (ros) => {
    this.cmdVel = new ROSLIB.Topic({
      ros: ros,
      name : 'turtle1/cmd_vel',
      messageType : 'geometry_msgs/Twist'
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
        {/* <button type="button" className="btn btn-secondary" onClick={() => this.setState({connected:!this.state.connected})}>mock connection</button> */}
          <div className="logo">ReactROS</div>
          {this.state.connected ? 
            <Controller move={this.ROSMove}/>:
            <UrlForm url={this.state.url} changeUrl={this.changeUrl} ROSConnect={this.ROSConnect}/>
          }
          {this.state.error && (<div className="alert alert-danger" role="alert">
            Error connecting to websocket server
          </div>)}
        </div>
      </div>
    );
  }
}

export default App;