// calendar.js
import * as actions from './actions'

export default function reducer(state = {
    currentDate: null,
    selected:    [],
  }, action) {
  switch (action.type) {
    case actions.CALENDAR_SET_CURRENT_DATE:
      return Object.assign({}, state, {
        currentDate: action.payload.date
      })
      break;
    case actions.CALENDAR_SET_INITIAL_RANGE_DATE:
      return Object.assign({}, state, {
        initialRangeDate: action.payload.date
      })
      break;
    case actions.CALENDAR_ADD_SELECTED_DAY:
      return Object.assign({}, state, {
        selected: state.selected.concat(action.payload.date)
      })
      break;
    case actions.CALENDAR_REMOVE_SELECTED_DAY:
      return Object.assign({}, state, {
        selected: state.selected.filter( date => date !== action.payload.date )
      })
      break;
    default:
     return state;
  }
}