import {
  REQUEST_LIFE_SCENERY,
  RECEIVE_LIFE_SCENERY,
  REQUEST_LIFE_FACILITIES,
  RECEIVE_LIFE_FACILITIES,
  REQUEST_LIFE_LEARNING,
  RECEIVE_LIFE_LEARNING,
  REQUEST_LIFE_SILHOUETTE,
  RECEIVE_LIFE_SILHOUETTE,
  REQUEST_LIFE_DAILYLIFE,
  RECEIVE_LIFE_DAILYLIFE
} from "../actions/types";

const INITIAL_STATE = {
  scenery: {},
  facilities: {},
  learning: {},
  silhouette: {},
  dailylife: {},
  isSceneryFetching: false,
  isFacilitiesFetching: false,
  isLearningFetching: false,
  isSilhouettFetching: false,
  isDailylifeFetching: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_LIFE_SCENERY:
      return { ...state, isSceneryFetching: true };
    case RECEIVE_LIFE_SCENERY:
      return { ...state, isSceneryFetching: false, scenery: action.payload };
    case REQUEST_LIFE_FACILITIES:
      return { ...state, isFacilitiesFetching: true };
    case RECEIVE_LIFE_FACILITIES:
      return {
        ...state,
        isFacilitiesFetching: false,
        facilities: action.payload
      };
    case REQUEST_LIFE_LEARNING:
      return { ...state, isLearningFetching: true };
    case RECEIVE_LIFE_LEARNING:
      return { ...state, isLearningFetching: false, learning: action.payload };
    case REQUEST_LIFE_SILHOUETTE:
      return { ...state, isSilhouettFetching: true };
    case RECEIVE_LIFE_SILHOUETTE:
      return {
        ...state,
        isSilhouettFetching: false,
        silhouette: action.payload
      };
    case REQUEST_LIFE_DAILYLIFE:
      return { ...state, isDailylifeFetching: true };
    case RECEIVE_LIFE_DAILYLIFE:
      return {
        ...state,
        isDailylifeFetching: false,
        dailylife: action.payload
      };
    default:
      return state;
  }
};
