import { FETCH_ACCOUNTS_DATA_REQUEST, RECEIVE_ACCOUNTS_DATA } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_accounts } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function receiveAccountsData(data) {
    return {
        type: RECEIVE_ACCOUNTS_DATA,
        payload: {
            data,
        },
    };
}

export function fetchAccountsDataRequest() {
    return {
        type: FETCH_ACCOUNTS_DATA_REQUEST,
    };
}

export function fetchAccountsData(token) {
    return (dispatch) => {
        dispatch(fetchAccountsDataRequest());
        data_about_accounts(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveAccountsData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}
