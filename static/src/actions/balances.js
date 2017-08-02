import {
  FETCH_BALANCES_DATA_REQUEST,
  RECEIVE_BALANCES_DATA
} from '../constants/index'
import { parseJSON } from '../utils/misc'
import { data_about_balances } from '../utils/http_functions'
import { logoutAndRedirect } from './auth'

export function receiveBalancesData(data) {
  return {
    type: RECEIVE_BALANCES_DATA,
    payload: {
      data
    }
  }
}

export function fetchBalancesDataRequest() {
  return {
    type: FETCH_BALANCES_DATA_REQUEST
  }
}

export function fetchBalancesData(token) {
  return dispatch => {
    dispatch(fetchBalancesDataRequest())
    data_about_balances(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveBalancesData(response.result))
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error))
        }
      })
  }
}
