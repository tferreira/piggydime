import { FETCH_RECURRENCE_DATA_REQUEST, RECEIVE_RECURRENCE_DATA } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_recurrence } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

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

export function fetchBalancesData(token) {
  return (dispatch) => {
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
