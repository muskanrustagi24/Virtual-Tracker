import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import workItemReducer from "./workItemReducer";
  
const rootReducer = combineReducers({
  projects: projectReducer,
  items: workItemReducer
});
  
export default rootReducer;