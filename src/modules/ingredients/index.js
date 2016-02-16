import * as actionTypes from './action_types';
export * from './actions';


export default function reducer(state = [], action){
  switch(action.type){
  case actionTypes.LOAD_INGREDIENTS_SUCCEEDED:
    return [...action.payload];

  case actionTypes.CREATE_INGREDIENT_SUCCEEDED:
    return [action.payload, ...state]

  case actionTypes.UPDATE_INGREDIENT_SUCCEEDED:
    return state.map(ing => {
      if(ing.id === action.payload.id){
        return action.payload
      }
      return ing
    })

  default:
    return state;
  }
}