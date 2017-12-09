import {
  FETCH_ACCOUNTS_DATA_REQUEST,
  RECEIVE_ACCOUNTS_DATA,
  SELECT_ACCOUNT
} from '../constants/index'
import { parseJSON } from '../utils/misc'
import {
  data_about_accounts,
  create_account,
  edit_account,
  delete_account
} from '../utils/http_functions'
import { receiveBalancesData } from './balances'
import { logoutAndRedirect } from './auth'

export function receiveAccountsData(data) {
  return {
    type: RECEIVE_ACCOUNTS_DATA,
    payload: {
      data
    }
  }
}

export function fetchAccountsDataRequest() {
  return {
    type: FETCH_ACCOUNTS_DATA_REQUEST
  }
}

export function fetchAccountsData(token, callback = null) {
  return dispatch => {
    dispatch(fetchAccountsDataRequest())
    data_about_accounts(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveAccountsData(response.result))
        if (callback !== null) {
          callback()
        }
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error))
        }
      })
  }
}

export function selectAccount(id) {
  return {
    type: SELECT_ACCOUNT,
    payload: id
  }
}

export function createAccount(token, account) {
  return dispatch => {
    create_account(
      token,
      account.label,
      account.bank,
      account.iban,
      account.bic,
      account.projected_date
    )
      .then(parseJSON)
      .then(response => {
        dispatch(selectAccount(response.id))
        dispatch(receiveBalancesData(response.balances))
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error))
        }
      })
  }
}

export function editAccount(token, account) {
  return dispatch => {
    edit_account(
      token,
      account.id,
      account.label,
      account.bank,
      account.iban,
      account.bic,
      account.projected_date
    )
      .then(parseJSON)
      .then(response => {
        dispatch(receiveBalancesData(response.balances))
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error))
        }
      })
  }
}

export function deleteAccount(token, id) {
  return dispatch => {
    delete_account(token, id)
      .then(parseJSON)
      .then(response => {})
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error))
        }
      })
  }
}
