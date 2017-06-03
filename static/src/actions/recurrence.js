import { FETCH_RECURRENCE_DATA_REQUEST, RECEIVE_RECURRENCE_DATA } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_recurrence, create_recurrence, edit_recurrence, delete_recurrence } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';
import { fetchAccountsData } from './accounts';
import { fetchTransactionsData } from './transactions';

export function receiveRecurrenceData(data) {
  return {
    type: RECEIVE_RECURRENCE_DATA,
    payload: {
      data,
    },
  };
}

export function fetchRecurrenceDataRequest() {
  return {
    type: FETCH_RECURRENCE_DATA_REQUEST,
  };
}

export function fetchRecurrenceData(token, account_id) {
  return (dispatch) => {
    dispatch((fetchAccountsData(token)));
    if (account_id) {
      dispatch((fetchTransactionsData(token, account_id)));
    }
    dispatch(fetchRecurrenceDataRequest());
    data_about_recurrence(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveRecurrenceData(response.result));
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}

export function createRecurrence(token, recurring_group) {
  return (dispatch) => {
    create_recurrence(
      token,
      recurring_group.accountId,
      recurring_group.label,
      recurring_group.amount,
      recurring_group.start_date,
      recurring_group.end_date,
      recurring_group.recurrence_day,
      recurring_group.recurrence_period
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

export function editRecurrence(token, recurring_group) {
  return (dispatch) => {
    edit_recurrence(
      token,
      recurring_group.id,
      recurring_group.label,
      recurring_group.amount,
      recurring_group.start_date,
      recurring_group.end_date,
      recurring_group.recurrence_day,
      recurring_group.recurrence_period
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

export function deleteRecurrence(token, id) {
  return (dispatch) => {
    delete_recurrence(token, id)
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
