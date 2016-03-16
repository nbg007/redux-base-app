import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import { routeReducer } from 'react-router-redux';


export default function configureReducers(reducers) {
  return combineReducers({
    ...reducers,
    routing: routeReducer,
    form: formReducer
  })
};
// A reducer function that keeps track of the router state. You must to add this reducer to your app reducers when creating the store. If you do not provide a custom selectRouterState function, the piece of state must be named routing.
