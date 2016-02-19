//TODO: Cambiar validate token por session (get) y llamarlo desde el login
import fetch from 'isomorphic-fetch'
import { applyToken, applyHeaders } from '../helpers';
import config from "../../config"
import { CALL_API } from '../../middleware/api'

/* Actions */
import { fetchIngredients } from '../ingredients'
import { fetchDishes } from '../dishes'
import { fetchOrders } from '../orders'
import { initNotifications } from '../notifications'
import { routeActions } from 'react-router-redux'

const MODULE_NAME = "base-app/auth/"

export const VALIDATE_TOKEN_FAILED = MODULE_NAME.concat("VALIDATE_TOKEN_FAILED")
export const VALIDATE_TOKEN_SUCCEEDED = MODULE_NAME.concat("VALIDATE_TOKEN_SUCCEEDED")
export const VALIDATE_TOKEN_ATTEMPTED = MODULE_NAME.concat("VALIDATE_TOKEN_ATTEMPTED")

export const LOGIN_ATTEMPTED = MODULE_NAME.concat("LOGIN_ATTEMPTED")
export const LOGIN_FAILED = MODULE_NAME.concat("LOGIN_FAILED")
export const LOGIN_SUCCEEDED = MODULE_NAME.concat("LOGIN_SUCCEEDED")
export const LOGOUT_SUCCEEDED = MODULE_NAME.concat("LOGOUT_SUCCEEDED")

export const REGISTER_SUCCEEDED = MODULE_NAME.concat("REGISTER_SUCCEEDED")
export const REGISTER_ATTEMPTED = MODULE_NAME.concat("REGISTER_ATTEMPTED")
export const REGISTER_FAILED = MODULE_NAME.concat("REGISTER_FAILED")

export function checkLogged(callback) {
  return (dispatch, getState) => {
    if (getState().auth.logged) {
      dispatch(routeActions.replace('/'))
    } else {
      callback()
    }
  }
}

export function validateToken() {
  return (dispatch, getState) => {
    if (!getState().auth.session.name) {
      return dispatch({
        [CALL_API]: {
          endpoint: 'session',
          authenticated: true,
          types: [VALIDATE_TOKEN_ATTEMPTED, VALIDATE_TOKEN_SUCCEEDED, VALIDATE_TOKEN_FAILED],
        }
      }).catch((e) => {
        dispatch(logout())
      })
    }
  }
}

export function logout() {
  return (dispatch, getState) => {
    localStorage.removeItem('token')
    dispatch({type: LOGOUT_SUCCEEDED})
    dispatch(routeActions.replace("/login"))
  }
}

export function login({username, password}) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: 'session',
        config: {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password
          })
        },
        types: [LOGIN_ATTEMPTED, LOGIN_SUCCEEDED, LOGIN_FAILED],
        //parseResponse:
      }
    }).then(({ payload }) =>  {
      localStorage.setItem('token', payload.token)
      dispatch(routeActions.push('/'))
    }).catch((e) => {
      return Promise.reject({ _error: e._error})
    })
  }
}

export function register(credentials) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: 'register',
        config: {
          method: 'POST',
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
          })
        },
        types: [REGISTER_ATTEMPTED, REGISTER_SUCCEEDED, REGISTER_FAILED],
      }
    }).then(({ payload, error}) =>  {
      console.log('llegoooooooooooooo')
      localStorage.setItem('token', payload.token)
      dispatch(routeActions.push('/'))
    }).catch((e) => {
      return Promise.reject({_error: e._error })
    })
  }
}
