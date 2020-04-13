import React, { Component } from "react";

class Block extends Component {
  onBatchSelect(block) {
    this.props.history.push(`/room/${block}`);
  }
  render() {
    const courses = [
      { name: "Web Development", id: "FbW7" },
      { name: "Web Development", id: "FbW8" },
      { name: "Online Marketing", id: "FbW9" },
      { name: "Web Development", id: "FbW10" }
    ];
    return (
      <div className="mid container min-height d-flex flex-column align-items-center text-center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          {courses.map(v => (
            <div
              className="card shadow"
              style={{
                width: "12rem",
                margin: "10px",
                backgroundColor: "#ebebe0	",
                color: "black"
              }}
            >
              <div className="card-body">
                <h5 className="card-title h2">{v.id}</h5>
                <button
                  onClick={() => this.onBatchSelect(v.id)}
                  className="card-text btn btn-sm btn-warning atex"
                >
                  Report Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Block;
