import { combineReducers } from "redux";
import homeReducer from "./homeReducer";
import homeInfoReducer from "./homeInfoReducer";
import profileReducer from "./profileReducer";
import activeMenuIndexReducer from "./activeMenuReducer";
import teachingReducer from "./teachingReducer";
import lifeReducer from "./lifeReducer";
import enrollmentReducer from "./enrollmentReducer";
import newsReducer from "./newsReducer";
import contactReducer from "./contactReducer";
export default combineReducers({
  homeReducer: homeReducer,
  homeInfoReducer: homeInfoReducer,
  profileReducer: profileReducer,
  teachingReducer: teachingReducer,
  lifeReducer: lifeReducer,
  enrollmentReducer: enrollmentReducer,
  newsReducer: newsReducer,
  contactReducer: contactReducer,
  activeMenuIndexReducer: activeMenuIndexReducer
});
