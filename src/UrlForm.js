import React, {Component} from "react";
import "./App.css";

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Type ROSBridge URL" onChange={this.props.changeUrl}/>
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.props.ROSConnect}>Connect</button>
        </div>
      </div>
    );
  }
}

export default UrlForm;