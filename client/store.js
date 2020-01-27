import { createStore } from 'redux';
//must import applyMiddleware
import reducers from './reducers/index.js';

const store = createStore(reducers);

export default store;
