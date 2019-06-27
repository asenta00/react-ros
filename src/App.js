import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="main">
        <div className="logo">ReactROS</div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Type ROSBridge URL"/>
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" id="button-addon2">Connect</button>
          </div>
        </div>
        <div className="controller">
          <button type="button" className="btn btn-secondary mdi mdi-chevron-up m-1"/>
          <div className="remaining-controls">
            <button type="button" className="btn btn-secondary mdi mdi-chevron-left"/>
            <button type="button" className="btn btn-secondary mdi mdi-chevron-down mx-1"/>
            <button type="button" className="btn btn-secondary mdi mdi-chevron-right"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
