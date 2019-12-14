import { combineReducers } from "redux";
import users from "./users";
import rooms from "./rooms";
import name from "./name";
export const allreducer = combineReducers({
  users: users,
  rooms: rooms,
  name: name
});
