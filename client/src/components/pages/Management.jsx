import React from "react";
import staff from "../../img/nav-image.jpeg";
import inventory from "../../img/inventory.jpeg";

export default function Management() {
  return (
    <div className="container">
      <div className="row min-height">
        <div className="col-sm-6 d-flex justify-content-center align-items-center">
          <div className=" d-flex justify-content-center align-items-center shadow border staff overlay-container">
            <p className="position-absolute student-text text-white rounded">
              Staff Details
            </p>
            <img src={staff} alt="students" className="imageToBeOverlayed" />
            <div class="overlay">
              <div class="text">
                <a
                  href="/management/staff"
                  className="text-decoration-none text-white rounded student-text bg-danger"
                >
                  Enter&nbsp;<i class="material-icons">launch</i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 d-flex justify-content-center align-items-center">
          <div className="border d-flex justify-content-center align-items-center shadow staff overlay-container">
            <p className="position-absolute student-text text-white rounded">
              Inventory
            </p>
            <img
              src={inventory}
              alt="students"
              className="imageToBeOverlayed"
            />
            <div class="overlay">
              <div class="text">
                <a
                  href="/management/inventory"
                  className="text-decoration-none text-white rounded student-text bg-danger"
                >
                  Enter&nbsp;<i class="material-icons">launch</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
