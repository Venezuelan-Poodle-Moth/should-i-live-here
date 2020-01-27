import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import searchReducer from './searchReducer.js';

const reducers = combineReducers({
  auth: authReducer,
  search: searchReducer,
});

export default reducers;
