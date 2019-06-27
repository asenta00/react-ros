import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="main">
        <div className="logo">ReactROS</div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type ROSBridge URL"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
            >
              Connect
            </button>
          </div>
        </div>
        <div
          class="btn-group controler mr-2"
          role="group"
          aria-label="First group"
        >
          <button type="button" class="btn btn-secondary">
            ▲
          </button>
          <div className="remaining-controls">
            <button type="button" class="btn btn-secondary">
              ◀
            </button>
            <button type="button" class="btn btn-secondary">
              ▼
            </button>
            <button type="button" class="btn btn-secondary">
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
