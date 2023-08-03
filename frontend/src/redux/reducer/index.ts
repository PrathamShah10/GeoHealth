import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user';

const appReducer = combineReducers({
  user: userReducer,
});

export default appReducer;
