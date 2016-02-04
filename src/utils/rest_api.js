//API utils

import { BASE_API_URL, LOCALSTORAGE_TOKEN_KEY } from '../config';
import { CALL_API } from '../middleware/api';

//Helpers
function getToken(){
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

function defaultParse(jsonBody){
  return jsonBody;
}

function defaultPrepare(jsonData){
  return jsonData;
}

function applyHeaders(request, shouldUseToken) {
  const token = getToken();
  if (token) {
    request.headers = request.headers || {}
    request.headers['Authorization'] = 'Bearer ' + token
  }
  return {
    ...request,
    headers: {
      ...request.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      }
    };
}

const defaultOptions = {
  parse: defaultParse,
  prepare: defaultPrepare,
  patch: false,
  secure: true
}

//HTTP GET
export function fetch(url, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options);
  var config = applyHeaders({}, options.secure);

  return {
    [CALL_API]: {
      endpoint: url,
      config,
      types,
      options: opts
    }
  }
}

//HTTP POST
export function create(url, data, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options);
  var config = applyHeaders({
    method: 'POST',
    body: opts.prepare(JSON.stringify(data))
  }, options.secure);
  return {
    [CALL_API]: {
      endpoint: url,
      config,
      types,
      options: opts
    }
  }
}

//HTTP PUT/PATCH
//Send { patch: true } in options to change VERB. PUT is default
export function update(url, data, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options);
  var config = applyHeaders({
    method: options.patch ? 'PATCH': 'PUT',
    body: opts.prepare(JSON.stringify(data))
  }, options.secure);
  return {
    [CALL_API]: {
      endpoint: url,
      config,
      types,
      options: opts
    }
  }
}

//HTTP DELETE
export function del(url, types, options = {}){
  var opts = Object.assign({}, defaultOptions, options);
  var config = applyHeaders({
    method: 'DELETE'
  }, options.secure);

  return {
    [CALL_API]: {
      endpoint: url,
      config,
      types,
      options: opts
    }
  }
}


