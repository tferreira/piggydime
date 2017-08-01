import {
  RECEIVE_BALANCES_DATA,
  FETCH_BALANCES_DATA_REQUEST
} from '../constants'
import { createReducer } from '../utils/misc'

const initialState = {
  data: null,
  isFetching: false,
  loaded: false
}

export default createReducer(initialState, {
  [RECEIVE_BALANCES_DATA]: (state, payload) =>
    Object.assign({}, state, {
      data: payload.data,
      isFetching: false,
      loaded: true
    }),
  [FETCH_BALANCES_DATA_REQUEST]: state =>
    Object.assign({}, state, {
      isFetching: true
    })
})
