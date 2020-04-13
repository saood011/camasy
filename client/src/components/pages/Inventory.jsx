import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  getInventoryDetails,
  createInventory,
} from "../../actions/inventoryActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      quantity: "",
      category: "",
      errors: {},
      notify: false,
    };
  }
  //on change handler
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ errors: {} });
  };
  //validation errors
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.errors === nextProps.errors) {
      this.setState({ errors: this.props });
    } else {
      this.setState({ errors: nextProps.errors });
    }
  }
  // get all inventory on mount
  componentDidMount() {
    this.props.getInventoryDetails();
  }

  // Add inventory button handler
  onClickHandler = (e) => {
    e.preventDefault();
    const newItem = {
      item: this.state.item,
      quantity: this.state.quantity,
      category: this.state.category,
    };
    this.props.createInventory(newItem);

    //clearing input field
    this.setState({ item: "", quantity: "", category: "" });

    // delay props to get the success message
    setTimeout(() => {
      this.props.inventoryData.inventoryData.success && this.notify();
    }, 200);
  };

  //Item added notification
  notify = () =>
    toast.success("Item has been added!", { position: "bottom-center" });
  notifyDel = (msg) => toast.error(msg, { position: "bottom-center" });

  //delete item
  async onDelete(item) {
    await axios
      .delete(`/api/inventory/`, { data: { id: item.id, item: item.item } })
      .then((res) => this.notifyDel(res.data.message))
      .catch((err) => console.log(err));
    await this.props.getInventoryDetails();
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="min-height container">
        <ToastContainer />

        <div className="row mt-2">
          <div className="col-sm text-center" style={{ color: "#fff" }}>
            <button
              type="button"
              class="btn btn-primary w-25"
              data-toggle="modal"
              data-target="#AddModal"
            >
              Add
            </button>

            <div
              class="modal fade"
              id="AddModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title bg-primary p-1 rounded w-100"
                      id="exampleModalLabel"
                    >
                      Add
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form className="needs-validation" noValidate>
                      <div className="form-row mt-3">
                        <div className="col-6">
                          <input
                            type="text"
                            name="item"
                            onChange={this.onChangeHandler}
                            className={classnames("form-control", {
                              "is-invalid": errors.report,
                            })}
                            placeholder="Item Name"
                            value={this.state.item}
                            required
                          />
                          {errors.report && (
                            <div className="invalid-tooltip">
                              {errors.report}
                            </div>
                          )}{" "}
                        </div>
                        <div className="col-6">
                          <input
                            type="number"
                            name="quantity"
                            onChange={this.onChangeHandler}
                            className={classnames("form-control", {
                              "is-invalid": errors.quantity || errors._message,
                            })}
                            placeholder="Quantity"
                            value={this.state.quantity}
                            required
                          />
                          {errors.quantity || errors._message ? (
                            <div className="invalid-tooltip">
                              {errors.quantity}Must be greater than 0
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="form-row mt-5">
                        <div className="col-12">
                          <select
                            class="custom-select mt-1"
                            name="category"
                            value={this.state.category}
                            className={classnames("form-control", {
                              "is-invalid": errors.category,
                            })}
                            onChange={this.onChangeHandler}
                          >
                            <option selected>Select Category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Computers">Computers</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Other">Other</option>
                          </select>{" "}
                          {errors.category && (
                            <div className="invalid-tooltip">
                              {errors.category}
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={this.onClickHandler}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm text-center" style={{ color: "#fff" }}>
            <button
              type="button"
              class="btn btn-danger w-25"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Issue
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5
                      class="modal-title bg-danger w-100 rounded p-1"
                      id="exampleModalLabel"
                    >
                      Issue
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    {" "}
                    <form className="form">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        required
                      />
                      <input
                        type="number"
                        className="form-control mt-1"
                        placeholder="Quantity"
                        required
                      />
                      <select class="custom-select mt-1">
                        <option selected>Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Computers">Computers</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Stationary">Other</option>
                      </select>
                      <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="StudentID"
                        required
                      />
                      <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Batch Number"
                        required
                      />
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.props.inventoryData.isloading ? (
            <p>loading</p>
          ) : (
            <table
              className="table table-striped text-center table-sm mt-2"
              id="mytableofinventory"
            >
              <thead className="thead bg-light">
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Added On</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {!this.props.inventoryData.inventoryData.success &&
                  this.props.inventoryData.inventoryData.map((v, i) => (
                    <tr key={v._id}>
                      <td>{i + 1}</td>
                      <td>{v.item}</td>
                      <td>{v.category}</td>
                      <td className={v.quantity === 1 ? "text-danger" : ""}>
                        {v.quantity === 1 ? "Out of stock!" : v.quantity}
                      </td>
                      <td>{moment(v.createdAt).format("lll")}</td>
                      <td
                        className="m-0 p-0 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.onDelete({ id: v._id, item: v.item });
                        }}
                      >
                        &times;
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors,
  inventoryData: state.inventoryData,
});

export default connect(mapStateToProps, {
  createInventory,
  getInventoryDetails,
})(Inventory);
