import { FETCH_CHARTS_DATA_REQUEST, RECEIVE_CHARTS_DATA } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_charts } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function receiveChartsData(data) {
  return {
    type: RECEIVE_CHARTS_DATA,
    payload: {
      data,
    },
  };
}

export function fetchChartsDataRequest() {
  return {
    type: FETCH_CHARTS_DATA_REQUEST,
  };
}

export function fetchChartsData(token) {
  return (dispatch) => {
    dispatch(fetchChartsDataRequest());
    data_about_charts(token)
      .then(parseJSON)
      .then(response => {
        dispatch(receiveChartsData(response.result));
      })
      .catch(error => {
        if (error.status === 401) {
          dispatch(logoutAndRedirect(error));
        }
      });
  };
}
