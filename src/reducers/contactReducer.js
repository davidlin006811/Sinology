import {
  REQUEST_CONTACT,
  RECEIVE_CONTACT,
  REQUEST_CONTACT_OPENDAY,
  RECEIVE_CONTACT_OPENDAY,
  REQUEST_CONTACT_SPONSOR,
  RECEIVE_CONTACT_SPONSOR
} from "../actions/types";

const INITIAL_STATE = {
  contact: {},
  openday: {},
  sponsor: {},
  isContactFetching: false,
  isOpendayFetching: false,
  isSponsorFetching: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CONTACT:
      return { ...state, isContactFetching: true };
    case RECEIVE_CONTACT:
      return { ...state, isContactFetching: false, contact: action.payload };
    case REQUEST_CONTACT_OPENDAY:
      return { ...state, isOpendayFetching: true };
    case RECEIVE_CONTACT_OPENDAY:
      return {
        ...state,
        isOpendayFetching: false,
        openday: action.payload
      };
    case REQUEST_CONTACT_SPONSOR:
      return { ...state, isSponsorFetching: true };
    case RECEIVE_CONTACT_SPONSOR:
      return { ...state, isSponsorFetching: false, sponsor: action.payload };

    default:
      return state;
  }
};
