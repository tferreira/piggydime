import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';
import accounts from './accounts';

const rootReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth,
    data,
    accounts,
});

export default rootReducer;
