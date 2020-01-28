import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';

//Create the store for Redux
const store = createStore(reducers, applyMiddleware(thunk));

export default store;
