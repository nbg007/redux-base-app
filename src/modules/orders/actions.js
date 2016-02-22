import { routeActions } from 'react-router-redux'
import { findById } from "../../utils/common"
import { CALL_API } from '../../middleware/api'

const MODULE_NAME = "base-app/orders/"

export const REQUEST_ORDERS_ATTEMPTED = MODULE_NAME.concat("REQUEST:ORDERS")
export const REQUEST_ORDERS_SUCCEEDED = MODULE_NAME.concat("RECEIVE:ORDERS")
export const ADD_ORDER_SUCCEEDED = MODULE_NAME.concat("ADD:ORDER")
export const ADD_ORDER_ATTEMPTED = MODULE_NAME.concat("ADD:ORDER_ATTEMPT")
export const ADD_ORDER_FAILED = MODULE_NAME.concat("ADD:ORDER_FAIL")
export const EDIT_ORDER_SUCCEEDED = MODULE_NAME.concat("EDIT:ORDER")
export const EDIT_ORDER_FAILED = MODULE_NAME.concat("EDIT:ORDER_FAIL")
export const EDIT_ORDER_ATTEMPTED = MODULE_NAME.concat("EDIT:ORDER_ATTEMPT")
export const REMOVE_ORDER_SUCCEEDED = MODULE_NAME.concat("REMOVE:ORDER")
export const REMOVE_ORDER_ATTEMPTED = MODULE_NAME.concat("REMOVE:ORDER_ATTEMPT")
export const REMOVE_ORDER_FAILED = MODULE_NAME.concat("REMOVE:ORDER_FAIL")
export const REQUEST_ORDER_ATTEMPTED = MODULE_NAME.concat("REQUEST:ORDER")
export const REQUEST_ORDER_SUCCEEDED = MODULE_NAME.concat("RECEIVE:ORDER")
export const CALENDAR_SET_CURRENT_DATE = MODULE_NAME.concat('CALENDAR:SET_CURRENT_DATE');
export const CALENDAR_ADD_SELECTED_DAY = MODULE_NAME.concat('CALENDAR:ADD_SELECTED_DAY');
export const CALENDAR_REMOVE_SELECTED_DAY = MODULE_NAME.concat('CALENDAR:REMOVE_SELECTED_DAY');

// TODO: Right now not working because there is no fetch for each dish to include ingredients. Pending to refactor
function checkAvailability(order, ingredients, dishes) {
  const dishesNotAvailable = order.dishes.reduce(function(acc, d)  {
    const dish = findById(d.id, dishes)
    const available = dish.ingredients.reduce((acc, ingredient) => {
      return acc && (ingredient.amount < findById(ingredient.id, ingredients).stock)
    }, true)
    available ? acc : acc.push(dish)
    return acc
  }, [])
  if (dishesNotAvailable.length > 0) {
    return { _error: "There are some dishes not available right now: " + dishesNotAvailable.map( d => {return d.name}).join(", "), name: 'dishes' }
  }
  return false 
}

//Async

export function fetchOrder(id) {
  return {
    [CALL_API]: {
      endpoint: ['orders', '/',  id].join(''),
      authenticated: true,
      types: [REQUEST_ORDER_ATTEMPTED, REQUEST_ORDER_SUCCEEDED]
    }
  }
}

export function fetchOrders(delay = 1000) {
  return {
    [CALL_API]: {
      endpoint: 'orders',
      authenticated: true,
      types: [REQUEST_ORDERS_ATTEMPTED, REQUEST_ORDERS_SUCCEEDED]
    }
  }
}

export function addOrder(order) {
  return (dispatch, getState) => {
    //const dishesNotAvailableError = checkAvailability(order, getState().ingredients.list, getState().dishes.list)
    const dishesNotAvailableError = false
    if (dishesNotAvailableError) {
      return Promise.reject({name: 'Dishes not available', _error: dishesNotAvailableError })
    } else {
      order.date = new Date()
      return dispatch({
        [CALL_API]: {
          endpoint: 'orders',
          authenticated: true,
          config: {
            method: 'POST',
            body: JSON.stringify(order)
          },
          types: [ADD_ORDER_ATTEMPTED, ADD_ORDER_SUCCEEDED, ADD_ORDER_FAILED]
        }
      }).then( ({ payload }) => {
          // DOC: An action creator that you can use to update the current URL and update the browser history. Just pass it a string like /foo/bar?param=5 as the path argument.
        dispatch(routeActions.push('/orders/'))
      }).catch((e) => {
        //How to return errors to your form on a async validation? You can specify {Name of the field: specific error, _error: Generic error} returning it on a reject
        return Promise.reject({name: "Order already exists", _error: 'Addition fail'})
      })
    }
  }
}

export function editOrder(order) {
  return (dispatch, getState) => {
    //const dishesNotAvailableError = checkAvailability(order, getState().ingredients.list, getState().dishes.list)
    const dishesNotAvailableError = false
    if (dishesNotAvailableError) {
      return Promise.reject({name: 'Dishes not available', _error: dishesNotAvailableError })
    } else {
      return dispatch({
        [CALL_API]: {
          endpoint: ['orders', '/',  order.id].join(''),
          authenticated: true,
          config: {
            method: 'PUT',
            body: JSON.stringify(order)
          },
          types: [EDIT_ORDER_ATTEMPTED, EDIT_ORDER_SUCCEEDED, EDIT_ORDER_FAILED]
        }
      })
      .then( ({ payload }) => {
          // DOC: An action creator that you can use to update the current URL and update the browser history. Just pass it a string like /foo/bar?param=5 as the path argument.
        dispatch(routeActions.push('/orders/'))
      }).catch((e) => {
        //How to return errors to your form on a async validation? You can specify {Name of the field: specific error, _error: Generic error} returning it on a reject
        return Promise.reject({name: "Order does not exists", _error: 'Edition fail'})
      })
    }
  }
}

export function removeOrder(order) {
  return (dispatch, getState) => {
    return dispatch({
      [CALL_API]: {
        endpoint: ['orders', '/',  order.id].join(''),
        authenticated: true,
        config: {
          method: 'DELETE'
        },
        types: [REMOVE_ORDER_ATTEMPTED, REMOVE_ORDER_SUCCEEDED, REMOVE_ORDER_FAILED]
      }
    }).then( ({ payload, error }) => {
      dispatch(routeActions.push('/orders/'))
    })
  }
}

export function calendarSetCurrentDate( date ) {
  return ( dispatch ) => {
    return dispatch( { type: CALENDAR_SET_CURRENT_DATE, payload: { date } } );
  }
}


export function calendarAddSelectedDay( date ) {
  return ( dispatch ) => dispatch({ type: CALENDAR_ADD_SELECTED_DAY, payload: { date } })
}

export function calendarRemoveSelectedDay( date ) {
  return ( dispatch ) => dispatch({ type: CALENDAR_REMOVE_SELECTED_DAY, payload: { date } })
}
