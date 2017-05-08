import { FETCH_ACCOUNTS_DATA_REQUEST, RECEIVE_ACCOUNTS_DATA } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_ACCOUNTS_DATA]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_ACCOUNTS_DATA_REQUEST]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
});
