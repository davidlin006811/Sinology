import {
  REQUEST_PROFILE_TUTOR,
  RECEIVE_PROFILE_TUTOR,
  REQUEST_PROFILE_REASON,
  RECEIVE_PROFILE_REASON,
  REQUEST_PROFILE_IDEA,
  RECEIVE_PROFILE_IDEA,
  REQUEST_PROFILE_STRUCT,
  RECEIVE_PROFILE_STRUCT
} from "../actions/types";
const INITIAL_STATE = {
  tutor: {},
  reason: {},
  idea: {},
  struct: {},
  isTutorFetching: false,
  isReasonFetching: false,
  isIdeaFetching: false,
  isStructFetching: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_PROFILE_TUTOR:
      return { ...state, isTutorFetching: true };
    case RECEIVE_PROFILE_TUTOR:
      return { ...state, isTutorFetching: false, tutor: action.payload };
    case REQUEST_PROFILE_REASON:
      return { ...state, isReasonFetching: true };
    case RECEIVE_PROFILE_REASON:
      return { ...state, isReasonFetching: false, reason: action.payload };
    case REQUEST_PROFILE_IDEA:
      return { ...state, isIdeaFetching: true };
    case RECEIVE_PROFILE_IDEA:
      return { ...state, isIdeaFetching: false, idea: action.payload };
    case REQUEST_PROFILE_STRUCT:
      return { ...state, isStructFetching: true };
    case RECEIVE_PROFILE_STRUCT:
      return { ...state, isStructFetching: false, struct: action.payload };
    default:
      return state;
  }
};
