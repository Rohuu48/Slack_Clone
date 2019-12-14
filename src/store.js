import { createStore } from "redux";
import { allreducer } from "./reducers/index";
import { applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { logger } from "redux-logger";
export const createmyStore = () =>
  createStore(allreducer, applyMiddleware(thunk, logger));
