import {
  RECEIVE_TRANSACTIONS_DATA,
  FETCH_TRANSACTIONS_DATA_REQUEST,
  ADD_TRANSACTION,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION
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
    }),
  [ADD_TRANSACTION]: (state, payload) =>
    Object.assign({}, state, {
      data: [...state.data, payload.data]
    }),
  [EDIT_TRANSACTION]: (state, payload) =>
    Object.assign({}, state, {
      data: state.data.map((element, index) => {
        if (element.transaction_id == payload.data.id) {
          return Object.assign({}, element, payload.data)
        }
        return element
      })
    }),
  [DELETE_TRANSACTION]: (state, payload) =>
    Object.assign({}, state, {
      data: state.data.filter(element => element.id != payload.data.id)
    })
})
