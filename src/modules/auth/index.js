import * as actions from './actions'
export * from './actions'

function session(state={
    username: undefined,
    email: undefined
  }, action) {
  switch (action.type) {
    case actions.REGISTER_SUCCEEDED:
    case actions.LOGIN:
      return Object.assign({}, action.payload)
    case actions.LOGOUT_SUCCEEDED:
      return {}
    case actions.VALIDATE_TOKEN_SUCCEEDED:
      return Object.assign({}, state, {
        username: action.payload.username  
      })
    default:
      return state
  }
}

export default function reducer(state={
  logged: false,
  loging: false,
  registering: false,
  session: session(undefined, {type: 'none'})
  }, action) {
  switch (action.type) {
    case actions.LOGIN_FAILED:
      return Object.assign({}, state, {
        loging: false
      })
    case actions.LOGIN_ATTEMPTED:
      return Object.assign({}, state, {
        loging: true
      })
    case actions.VALIDATE_TOKEN_FAILED:
      return Object.assign({}, state, {
        logged: false
      })
    case actions.VALIDATE_TOKEN_SUCCEEDED:
      return Object.assign({}, state, {
        logged: true,
        session: session(state.session, action)
      })
    case actions.LOGIN_SUCCEEDED:
      return Object.assign({}, state, {
        logged: true,
        loging: false
      })
    case actions.LOGOUT_SUCCEEDED:
      return Object.assign({}, state, {
        logged: false,
        logging: false,
        registering: false,
        session: {} 
      })
    case actions.REGISTER_FAILED:
      return Object.assign({}, state, {
        registering: false
      })
    case actions.REGISTER_ATTEMPTED:
      return Object.assign({}, state, {
        registering: true
      })
    case actions.REGISTER_SUCCEEDED:
      return Object.assign({}, state, {
        registering: false,
        logged: true
      })
    default:
      return state
  }
}
