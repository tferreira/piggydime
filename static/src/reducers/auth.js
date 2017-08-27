import jwtDecode from 'jwt-decode'
import { createReducer } from '../utils/misc'
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../constants/index'

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  isRegistering: false,
  isRegistered: false,
  registerStatusText: null
}

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: state =>
    Object.assign({}, state, {
      isAuthenticating: true,
      statusIntlId: null,
      statusText: null
    }),
  [LOGIN_USER_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      userName: jwtDecode(payload.token).email,
      statusIntlId: 'login.success',
      statusText: null
    }),
  [LOGIN_USER_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusIntlId: 'login.error',
      statusText: `${payload.status} ${payload.statusText}`
    }),
  [LOGOUT_USER]: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
      statusIntlId: 'logout.success',
      statusText: null
    }),
  [REGISTER_USER_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      isRegistering: false,
      token: payload.token,
      userName: jwtDecode(payload.token).email,
      statusIntlId: 'register.success',
      statusText: null
    }),
  [REGISTER_USER_REQUEST]: state =>
    Object.assign({}, state, {
      isRegistering: true
    }),
  [REGISTER_USER_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
      statusIntlId: 'register.error',
      statusText: `${payload.status} ${payload.statusText}`
    })
})
