import React, {Component} from "react";
import "./App.css";

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (
      <div className="controller">
        <button type="button" className="btn btn-secondary mdi mdi-chevron-up m-1" onClick={() => this.props.move("up")}/>
        <div className="remaining-controls">
          <button type="button" className="btn btn-secondary mdi mdi-chevron-left" onClick={() => this.props.move("left")}/>
          <button type="button" className="btn btn-secondary mdi mdi-chevron-down mx-1" onClick={() => this.props.move("down")}/>
          <button type="button" className="btn btn-secondary mdi mdi-chevron-right" onClick={() => this.props.move("right")}/>
        </div>
      </div>
    );
  }
}

export default Controller;