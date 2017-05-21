import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import user from './user';
import accounts from './accounts';
import balances from './balances';
import transactions from './transactions';

const rootReducer = combineReducers({
  routing: routerReducer,
  /* your reducers */
  auth,
  user,
  accounts,
  balances,
  transactions,
});

export default rootReducer;
