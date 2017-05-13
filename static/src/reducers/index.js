import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import user from './user';
import accounts from './accounts';

const rootReducer = combineReducers({
  routing: routerReducer,
  /* your reducers */
  auth,
  user,
  accounts,
});

export default rootReducer;
