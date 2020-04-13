import axios from "axios";

import {
  GET_INVENTORY_DETAILS,
  ENABLE_INVENTORY_DETAILS_LOADING,
  GET_ERRORS,
  DISABLE_INVENTORY_DETAILS_LOADING
} from "./types";

export const getInventoryDetails = () => dispatch => {
  dispatch(enableInventoryLoading());
  axios
    .get("/api/inventory/getall")
    .then(res => {
      dispatch({
        type: GET_INVENTORY_DETAILS,
        payload: res.data
      });
      dispatch(disableInventoryLoading());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createInventory = item => dispatch => {
  axios
    .post("/api/inventory/", item)
    .then(res => {
      dispatch({
        type: GET_INVENTORY_DETAILS,
        payload: res.data
      });
      dispatch(getInventoryDetails());
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const enableInventoryLoading = () => {
  return {
    type: ENABLE_INVENTORY_DETAILS_LOADING
  };
};
export const disableInventoryLoading = () => {
  return {
    type: DISABLE_INVENTORY_DETAILS_LOADING
  };
};
