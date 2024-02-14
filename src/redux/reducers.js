// reducers/index.js
import { combineReducers } from 'redux';
import storeReducer from './_store/reducer'; // import your reducers here

const rootReducer = combineReducers({
    store: storeReducer
});

export default rootReducer;
