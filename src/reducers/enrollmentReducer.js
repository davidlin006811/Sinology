import {
  REQUEST_ENROLLMENT_RECRUIT,
  RECEIVE_ENROLLMENT_RECRUIT,
  REQUEST_ENROLLMENT_EMPLOYMENT,
  RECEIVE_ENROLLMENT_EMPLOYMENT,
  REQUEST_ENROLLMENT_ALUMNI,
  RECEIVE_ENROLLMENT_ALUMNI
} from "../actions/types";
const INITIAL_STATE = {
  recruit: {},
  employment: {},
  alumni: {},
  isRecruitFetching: false,
  isEmploymentFetching: false,
  isAlumniFetching: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_ENROLLMENT_RECRUIT:
      return { ...state, isRecruitFetching: true };
    case RECEIVE_ENROLLMENT_RECRUIT:
      return { ...state, isRecruitFetching: false, recruit: action.payload };
    case REQUEST_ENROLLMENT_EMPLOYMENT:
      return { ...state, isEmploymentFetching: true };
    case RECEIVE_ENROLLMENT_EMPLOYMENT:
      return {
        ...state,
        isEmploymentFetching: false,
        employment: action.payload
      };
    case REQUEST_ENROLLMENT_ALUMNI:
      return { ...state, isAlumniFetching: true };
    case RECEIVE_ENROLLMENT_ALUMNI:
      return { ...state, isAlumniFetching: false, alumni: action.payload };

    default:
      return state;
  }
};
