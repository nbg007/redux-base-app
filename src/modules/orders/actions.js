import { routeActions } from 'react-router-redux'
import { findById } from '../../utils/common'
import { fetch, update, create, del } from '../../utils/rest_api'

const MODULE_NAME = 'base-app/orders/'

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
    return { _error: 'There are some dishes not available right now: ' + dishesNotAvailable.map( d => {return d.name}).join(', '), name: 'dishes' }
  }
  return false
}

//Async
const opts = { parse: (x) => x.data }

export const REQUEST_ORDER_ATTEMPTED = MODULE_NAME.concat('REQUEST:ORDER:ATTEMPTED')
export const REQUEST_ORDER_SUCCEEDED = MODULE_NAME.concat('REQUEST:ORDER:SUCCEEDED')
export function fetchOrder(id) {
  let types = [REQUEST_ORDER_ATTEMPTED, REQUEST_ORDER_SUCCEEDED]
  return fetch(`orders/${id}`, types, opts)
}

export const REQUEST_ORDERS_ATTEMPTED = MODULE_NAME.concat('REQUEST:ORDERS:ATTEMPTED')
export const REQUEST_ORDERS_SUCCEEDED = MODULE_NAME.concat('RECEIVE:ORDERS:SUCCEEDED')
export function fetchOrders() {
  let types = [REQUEST_ORDERS_ATTEMPTED, REQUEST_ORDERS_SUCCEEDED]
  return fetch('orders', types, opts)
}

export const ADD_ORDER_SUCCEEDED = MODULE_NAME.concat('ADD:ORDER:SUCCEEDED')
export const ADD_ORDER_ATTEMPTED = MODULE_NAME.concat('ADD:ORDER:ATTEMPTED')
export const ADD_ORDER_FAILED = MODULE_NAME.concat('ADD:ORDER:FAILED')
export function addOrder(order) {
  return (dispatch, getState) => {
    //const dishesNotAvailableError = checkAvailability(order, getState().ingredients.list, getState().dishes.list)
    const dishesNotAvailableError = false
    if (dishesNotAvailableError) {
      return Promise.reject({name: 'Dishes not available', _error: dishesNotAvailableError })
    }
    else {
      let types = [ADD_ORDER_ATTEMPTED, ADD_ORDER_SUCCEEDED, ADD_ORDER_FAILED]
      //FIX - this breaks server. Why send date? Field doesn't exist in the API!!
      //createdAt will be set by the backend
      //order.date = new Date()
      return dispatch(create('orders', order, types, opts))
      .then( ({ payload }) => {
        dispatch(routeActions.push('/orders/'))
      })
      .catch((e) => {
        //How to return errors to your form on a async validation? You can specify {Name of the field: specific error, _error: Generic error} returning it on a reject
        console.log('Order create failed', e)
        return Promise.reject({name: 'Order already exists', _error: 'Addition fail'})
      })
    }
  }
}

export const EDIT_ORDER_SUCCEEDED = MODULE_NAME.concat('EDIT:ORDER:SUCCEEDED')
export const EDIT_ORDER_FAILED = MODULE_NAME.concat('EDIT:ORDER:FAILED')
export const EDIT_ORDER_ATTEMPTED = MODULE_NAME.concat('EDIT:ORDER:ATTEMPTED')

export function editOrder(order) {
  return (dispatch, getState) => {
    //const dishesNotAvailableError = checkAvailability(order, getState().ingredients.list, getState().dishes.list)
    const dishesNotAvailableError = false
    if (dishesNotAvailableError) {
      return Promise.reject({name: 'Dishes not available', _error: dishesNotAvailableError })
    }
    else {
      let types = [EDIT_ORDER_ATTEMPTED, EDIT_ORDER_SUCCEEDED, EDIT_ORDER_FAILED]
      return dispatch(update(`orders/${order.id}`, order, types, opts))
      .then( ({ payload }) => {
          // DOC: An action creator that you can use to update the current URL and update the browser history. Just pass it a string like /foo/bar?param=5 as the path argument.
        dispatch(routeActions.push('/orders/'))
      })
      .catch((e) => {
        console.log('Update order failed', e)
        //How to return errors to your form on a async validation? You can specify {Name of the field: specific error, _error: Generic error} returning it on a reject
        return Promise.reject({name: 'Order does not exists', _error: 'Edition fail'})
      })
    }
  }
}

export const REMOVE_ORDER_SUCCEEDED = MODULE_NAME.concat('REMOVE:ORDER:SUCCEEDED')
export const REMOVE_ORDER_ATTEMPTED = MODULE_NAME.concat('REMOVE:ORDER:ATTEMPTED')
export const REMOVE_ORDER_FAILED = MODULE_NAME.concat('REMOVE:ORDER:FAILED')

export function removeOrder(order) {
  return (dispatch, getState) => {
    let types = [REMOVE_ORDER_ATTEMPTED, REMOVE_ORDER_SUCCEEDED, REMOVE_ORDER_FAILED]
    let delParse = (x) => order.id
    let delOpts = { parse: delParse }

    return dispatch(del(`orders/${order.id}`, types, delOpts))
    .then( ({ payload, error }) => {
      dispatch(routeActions.push('/orders/'))
    })
    .catch(e => {
      console.log('Error deleting order', e)
    })
  }
}

export const CALENDAR_SET_CURRENT_DATE = MODULE_NAME.concat('CALENDAR:SET_CURRENT_DATE')
export const CALENDAR_ADD_SELECTED_DAY = MODULE_NAME.concat('CALENDAR:ADD_SELECTED_DAY')
export const CALENDAR_REMOVE_SELECTED_DAY = MODULE_NAME.concat('CALENDAR:REMOVE_SELECTED_DAY')

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
