import * as actionTypes from './action_types';
import API from './api';

export function loadAll(){
  return (dispatch, getState) => {
    return dispatch(API.loadAll());
  }
}

export function loadById(id){
  return (dispatch, getState) => {
    return dispatch(API.loadById(id));
  }
}