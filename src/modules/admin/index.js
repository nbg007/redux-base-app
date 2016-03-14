const LOAD_SUCCEEDED = "admin/LOAD_SUCCEEDED"
const LOAD_ATTEMPTED = "admin/LOAD_ATTEMPTED"

export function load() {
  dispatch({type: LOAD_ATTEMPTED})
  setTimeout(() => dispatch({type: LOAD_SUCCEEDED}), 2000)
} 

export default function reducer(state={isFetching:false, message:"Admin module"}, action) {
  debugger
  switch (action.type) {
    case LOAD_ATTEMPTED:
      return {...state, isFetching: true}
    case LOAD_SUCCEEDED:
      return {...state, isFetching: false}
    default:
      return state;
  }  
}
