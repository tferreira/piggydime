import { FETCH_TRANSACTIONS_DATA_REQUEST, RECEIVE_TRANSACTIONS_DATA } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_transactions, create_transaction, edit_transaction, delete_transaction } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function receiveTransactionsData(data) {
  return {
    type: RECEIVE_TRANSACTIONS_DATA,
    payload: {
      data,
    },
  };
}

export function fetchTransactionsDataRequest() {
  return {
    type: FETCH_TRANSACTIONS_DATA_REQUEST,
  };
}

export function fetchTransactionsData(token, account_id) {
  return (dispatch) => {
    dispatch(fetchTransactionsDataRequest());
    data_about_transactions(token, account_id)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveTransactionsData(response.result));
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}

export function createTransaction(token, transaction) { 
  return (dispatch) => {
    create_transaction(
      token,
      transaction.accountId,
      transaction.label,
      transaction.amount,
      transaction.recurrentGroupId,
      transaction.date
      )
      .then(parseJSON)
      .then(response => {
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}

export function editTransaction(token, transaction) { 
  return (dispatch) => {
    edit_transaction(
      token,
      transaction.transaction_id,
      transaction.label,
      transaction.amount,
      transaction.date
      )
      .then(parseJSON)
      .then(response => {
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}

export function deleteTransaction(token, transaction_id) { 
  return (dispatch) => {
    delete_transaction(token, transaction_id)
      .then(parseJSON)
      .then(response => {
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}
