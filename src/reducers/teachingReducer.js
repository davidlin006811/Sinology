import {
  REQUEST_TEACHING_STAFF,
  RECEIVE_TEACHING_STAFF,
  REQUEST_TEACHING_COURSE,
  RECEIVE_TEACHING_COURSE,
  REQUEST_TEACHING_MORAL,
  RECEIVE_TEACHING_MORAL,
  REQUEST_TEACHING_INTERNSHIP,
  RECEIVE_TEACHING_INTERNSHIP,
  REQUEST_TEACHING_RESOURCE,
  RECEIVE_TEACHING_RESOURCE
} from "../actions/types";
const INITIAL_STATE = {
  staff: {},
  course: {},
  moral: {},
  internship: {},
  resource: {},
  isStaffFetching: false,
  isCourseFetching: false,
  isMoralFetching: false,
  isInternshipFetching: false,
  isResourceFetching: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TEACHING_STAFF:
      return { ...state, isStaffFetching: true };
    case RECEIVE_TEACHING_STAFF:
      return { ...state, isStaffFetching: false, staff: action.payload };
    case REQUEST_TEACHING_COURSE:
      return { ...state, isCourseFetching: true };
    case RECEIVE_TEACHING_COURSE:
      return { ...state, isCourseFetching: false, course: action.payload };
    case REQUEST_TEACHING_MORAL:
      return { ...state, isMoralFetching: true };
    case RECEIVE_TEACHING_MORAL:
      return { ...state, isMoralFetching: false, moral: action.payload };
    case REQUEST_TEACHING_INTERNSHIP:
      return { ...state, isInternshipFetching: true };
    case RECEIVE_TEACHING_INTERNSHIP:
      return {
        ...state,
        isInternshipFetching: false,
        internship: action.payload
      };
    case REQUEST_TEACHING_RESOURCE:
      return { ...state, isResourceFetching: true };
    case RECEIVE_TEACHING_RESOURCE:
      return { ...state, isResourceFetching: false, resource: action.payload };
    default:
      return state;
  }
};
