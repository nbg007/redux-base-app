import { CALL_API } from '../../middleware/api'
import { push, replace, routeActions } from 'react-router-redux';
import AuthAPI from './api';


//UTILS
function clearToken(){
  localStorage.removeItem('token');
}

function getToken(){
  return localStorage.getItem('token');
}

function saveToken(token){
  localStorage.setItem('token', token)
}

function goToLogin(){
  return push('/login');
}

//Action creators
export function checkLogged(callback) {
  return (dispatch, getState) => {
    if (getState().auth.logged) {
      dispatch(replace('/'))
    } else {
      callback()
    }
  }
}

//getSession
export function getSession() {
  return (dispatch, getState) => {
    //bail out early, if no token avoid calling the API
    if(!getToken()){
      return dispatch(goToLogin());
    }
    if (!getState().auth.logged) {
      return dispatch(AuthAPI.getSession())
      .then(data => {
        console.log('getSession OK', data);
      })
      .catch((e) => {
        //throw e;
        console.log('getSession failed', e);
        clearToken();
        dispatch(goToLogin());
      })
    }
  }
}


//LOGOUT
export function logout() {
  return (dispatch, getState) => {
    dispatch(AuthAPI.logout())
      .then(() => {
        clearToken();
        dispatch(goToLogin());
      })
      .catch(errors => {
        console.log('Logout failed!', errors);
      })
  }
}


// LOGIN
export function login({username, password}) {
  return (dispatch, getState) => {
    dispatch(AuthAPI.login(username, password))
    .then(response =>  {
      console.log('Login OK', response);
      saveToken(response.token);
      dispatch(push('/'));
    })
    .catch((e) => {
      return Promise.reject({ _error: e._error})
    })
  }
}


//REGISTER
export function register(credentials) {
  return (dispatch, getState) => {
    return dispatch(AuthAPI.register(credentials))
    .then((payload) =>  {
      console.log('Register OK', payload);
      localStorage.setItem('token', payload.token)
      dispatch(push('/'))
    })
    .catch((e) => {
      console.log('Register failed', e);
      return Promise.reject({_error: e.errors[0] })
    })
  }
}
