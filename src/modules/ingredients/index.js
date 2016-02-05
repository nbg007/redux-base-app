import * as actionTypes from './action_types';
export * from './actions';


export default function reducer(state = [], action){
  switch(action.type){
  case actionTypes.LOAD_INGREDIENTS_SUCCEEDED:
    return [...action.payload];

  default:
    return state;
  }
}