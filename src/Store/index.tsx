import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./RootReducer/index";
import { UserState } from "./RootReducer/index.interface";
export interface Rootstate {
  userReducer: UserState;
}

const reducer = combineReducers({
  userReducer,
  // here we will be adding reducers
});
const store = configureStore({
  reducer,
});
export default store;
