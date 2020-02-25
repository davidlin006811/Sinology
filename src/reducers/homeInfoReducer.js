import {
  REQUEST_HOME_INFORMATION,
  RECEIVE_HOME_INFORMATION
} from "../actions/types";
const INITIAL_STATE = {
  homeInfo: {},
  isFetching: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_HOME_INFORMATION:
      return { ...state, isFetching: true };
    case RECEIVE_HOME_INFORMATION:
      return {
        ...state,
        homeInfo: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
};
