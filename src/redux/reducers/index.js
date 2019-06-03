import { combineReducers } from "redux";
import contacts from "./contactReducer";
import creators from "./creatorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  contacts,
  creators,
  apiCallsInProgress
});

export default rootReducer;
