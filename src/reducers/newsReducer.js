import {
  REQUEST_NEWS_2019,
  RECEIVE_NEWS_2019,
  REQUEST_NEWS_2018,
  RECEIVE_NEWS_2018
} from "../actions/types";
const INITIAL_STATE = {
  news_2019: {},
  news_2018: {},
  isNews2019Fetching: false,
  isNews2018Fetching: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_NEWS_2019:
      return { ...state, isNews2019Fetching: true };
    case RECEIVE_NEWS_2019:
      return { ...state, isNews2019Fetching: false, news_2019: action.payload };
    case REQUEST_NEWS_2018:
      return { ...state, isNews2018Fetching: true };
    case RECEIVE_NEWS_2018:
      return { ...state, isNews2018Fetching: false, news_2018: action.payload };
    default:
      return state;
  }
};
