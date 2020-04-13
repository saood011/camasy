import {
  GET_INVENTORY_DETAILS,
  ENABLE_INVENTORY_DETAILS_LOADING,
  DISABLE_INVENTORY_DETAILS_LOADING
} from "../actions/types";

const initialState = {
  inventoryData: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY_DETAILS:
      return {
        ...state,
        inventoryData: action.payload
      };
    case ENABLE_INVENTORY_DETAILS_LOADING:
      return {
        ...state,
        loading: true
      };
    case DISABLE_INVENTORY_DETAILS_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
