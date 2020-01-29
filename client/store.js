import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
