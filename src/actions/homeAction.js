import axios from "axios";
import {
  REQUEST_HOME_CONTENT,
  RECEIVE_HOME_CONTENT,
  REQUEST_HOME_INFORMATION,
  RECEIVE_HOME_INFORMATION
} from "./types";
import { HOME_URL, PRE_FIX } from "../config";

export const fetchHomeContent = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_HOME_CONTENT });
    const res = await axios.get(HOME_URL);
    for (let i = 0; i < res.data.data.rows.length; i++) {
      let item = res.data.data.rows[i];
      if (item.sub_category.length > 0) {
        for (let i = 0; i < item.sub_category.length; i++) {
          item.sub_category[i].url = item.sub_category[i].url.replace(
            new RegExp(PRE_FIX, "g"),
            "/"
          );
        }
      }
    }
    dispatch({ type: RECEIVE_HOME_CONTENT, payload: res.data.data.rows });
  } catch (e) {
    console.log(e);
    dispatch({ type: RECEIVE_HOME_CONTENT, payload: [] });
  }
};

export const fetchHomeInfo = url => {
  return async dispatch => {
    try {
      dispatch({ type: REQUEST_HOME_INFORMATION });
      const res = await axios.get(url);
      dispatch({ type: RECEIVE_HOME_INFORMATION, payload: res.data.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: RECEIVE_HOME_CONTENT, payload: [] });
    }
  };
};
