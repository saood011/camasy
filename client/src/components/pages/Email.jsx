import React, { Component } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import Swal from "sweetalert2";
class Email extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, subject: "", body: "" };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }
  sendEmail = (info) => {
    axios.post("/api/student/sendemail", info).then((res) => {
      Swal.fire(res.data);
    });
  };

  render() {
    return (
      <div>
        <Popup
          trigger={
            <p title="Send email" style={{ cursor: "pointer" }}>
              {this.props.email}
            </p>
          }
          position="bottom left"
        >
          {(close) => (
            <div>
              <h6 className="bg-warning text-center p-1">
                Email to: {this.props.email}
              </h6>
              <form>
                <div class="form-group">
                  <label htmlFor="formGroupExampleInput2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    class="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Subject"
                    defaultValue="Email from CaMaSy"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="formGroupExampleInput2">Body</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    name="body"
                    onChange={this.onChangeHandler}
                    rows="6"
                  ></textarea>
                </div>
              </form>
              <button
                className="close bg-danger p-2 text-white btn"
                onClick={close}
              >
                &times;
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.sendEmail({
                    Email: this.props.email,
                    subject: this.state.subject,
                    message: this.state.body,
                  });
                  setTimeout(() => {
                    close();
                  }, 1000);
                }}
              >
                Send
              </button>
            </div>
          )}
        </Popup>
      </div>
    );
  }
}
export default Email;
