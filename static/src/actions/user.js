import { FETCH_USER_DATA_REQUEST, RECEIVE_USER_DATA } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_user, data_about_accounts } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function receiveUserData(data) {
    return {
        type: RECEIVE_USER_DATA,
        payload: {
            data,
        },
    };
}

export function fetchUserDataRequest() {
    return {
        type: FETCH_USER_DATA_REQUEST,
    };
}

export function fetchUserData(token) {
    return (dispatch) => {
        dispatch(fetchUserDataRequest());
        data_about_user(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveUserData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}
