import {
  RECEIVE_ACCOUNTS_DATA,
  FETCH_ACCOUNTS_DATA_REQUEST,
  SELECT_ACCOUNT } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
  data: null,
  isFetching: false,
  selectedAccount: null,
  loaded: false,
};

export default createReducer(initialState, {
  [RECEIVE_ACCOUNTS_DATA]: (state, payload) =>
    Object.assign({}, state, {
      data: payload.data,
      isFetching: false,
      loaded: true,
    }),
  [FETCH_ACCOUNTS_DATA_REQUEST]: (state) =>
    Object.assign({}, state, {
      isFetching: true,
    }),
  [SELECT_ACCOUNT]: (state, payload) =>
    Object.assign({}, state, {
      selectedAccount: payload,
    }),
});
