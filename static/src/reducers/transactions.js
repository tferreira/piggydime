import {
  RECEIVE_TRANSACTIONS_DATA,
  FETCH_TRANSACTIONS_DATA_REQUEST
} from '../constants'
import { createReducer } from '../utils/misc'

const initialState = {
  data: null,
  isFetching: false,
  loaded: false
}

export default createReducer(initialState, {
  [RECEIVE_TRANSACTIONS_DATA]: (state, payload) =>
    Object.assign({}, state, {
      data: payload.data,
      isFetching: false,
      loaded: true
    }),
  [FETCH_TRANSACTIONS_DATA_REQUEST]: state =>
    Object.assign({}, state, {
      isFetching: true
    })
})
