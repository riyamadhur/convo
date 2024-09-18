import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { chatReducer } from "./chatSlice";
import { userReducer } from "./userSlice";

const rootReducer = combineReducers({
  chatReducer,
  userReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
