// Architecture file
//TODO: Not finished (post requests)
//
//polyfills fetch for non-compatible browser (issue #6)
import fetch from 'isomorphic-fetch'
import config from '../config'
import { applyToken, applyHeaders }from './helpers'
import * as actions from '../modules/auth'
import { routeActions } from 'react-router-redux';

const BASE_URL = config.BASE_API_URL


function callApi(endpoint, config={}) {
  //let token = localStorage.getItem('token') || null
  // config = applyHeaders(config, token)

  // if (shouldAuthenticate && !token) {
  //   //console.warn('Called an authorized API (' + endpoint + ') without a valid token');
  //   return Promise.reject(new Error("Token not found"));
  // }

  return fetch(BASE_URL + endpoint, config)
    .then(response => {
        return response.json()
          .then(json=> ({ json, response }))
          .catch(() => ({ response }))
      }
    )
    .then(({ json, response }) => {
      //console.log('Fetch then', json, response);
      if (!response.ok) {
        //NOTE: this "errors" props is app-specific
        //throw json.errors
        console.warn('callAPI response not OK', response.statusText, json);
        throw json ? json : new Error(response.statusText);
      }
      else {
        //NOTE: this json.data is app-specific!!!
        //return json.data;
        return json;

      }
    })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, config, options  } = callAPI

  const [ requestType, successType, errorType] = types

  next({type: requestType })
  // Passing the authenticated boolean back in our data will let us distinguish
  return callApi(endpoint, config)
  .then(
    payload => {
      //console.log('callAPI then', payload);
      next({
        payload: options.parse(payload),
        type: successType
      });
      return options.parse(payload);
    },
    error => {
      console.log('callAPI error', error);
      next({
        error,
        type: errorType
      });
      throw error;
    }
  )
}
