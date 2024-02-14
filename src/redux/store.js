// store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Import thunk middleware
import {logger} from 'redux-logger';
import rootReducer from './reducers'; // assuming you have a rootReducer file

const store = createStore(rootReducer, applyMiddleware(thunk, logger)); // Apply thunk middleware

export default store;
