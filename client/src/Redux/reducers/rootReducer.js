import { combineReducers } from "redux";
import { freelanceReducer } from "./freelanceReducer";
import { editReducer } from "./editReducer";

export const rootReducer = combineReducers({ freelanceReducer, editReducer });
