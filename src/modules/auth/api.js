import {
  LOGIN_ATTEMPTED, LOGIN_SUCCEEDED, LOGIN_FAILED,
  GET_SESSION_ATTEMPTED, GET_SESSION_SUCCEEDED, GET_SESSION_FAILED,
  LOGOUT_ATTEMPTED, LOGOUT_SUCCEEDED, LOGOUT_FAILED,
  REGISTER_ATTEMPTED, REGISTER_SUCCEEDED, REGISTER_FAILED
} from './action_types';

import { fetch, create, update, del } from '../../utils/rest_api';


/*
 Common "parse" function. In this case, the example Auth API
 returns data as { type: 'resource', data: {xxx}|[xxx]}
 */
function parse(json){
  return json.data;
}
//Auth API adapter
function login(username, password){
  return create(
    'session',
    { username, password },
    [LOGIN_ATTEMPTED, LOGIN_SUCCEEDED, LOGIN_FAILED],
    {
      secure: false,
      parse
    }
  );
}

function logout(){
  return del('session', [LOGOUT_ATTEMPTED, LOGOUT_SUCCEEDED, LOGOUT_FAILED], { authenticated: true });
}

function register({ username, password }){
  return create(
    'register',
    { username, password },
    [REGISTER_ATTEMPTED, REGISTER_SUCCEEDED, REGISTER_FAILED],
    {
      secure: false,
      parse
    }
  );
}

function getSession(){
  return fetch(
    'session',
    [GET_SESSION_ATTEMPTED, GET_SESSION_SUCCEEDED, GET_SESSION_FAILED],
    {
      parse
    }
  );

}

const AuthAPI = {
  login,
  logout,
  register,
  getSession
};

export default AuthAPI;