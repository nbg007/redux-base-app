import * as actions from './action_types'
export * from './actions'

function session(state = {}, action) {
  switch (action.type) {
    case actions.GET_SESSION_SUCCEEDED:
      return Object.assign({}, action.payload)
    case actions.LOGOUT_SUCCEEDED:
      return {}
    default:
      return state
  }
}

const initialState = {
  isLogged: false,
  isLoginStarted: false,
  isRegistering: false,
  session: {
    username: undefined,
    id: undefined
  }
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    //LOGIN
    case actions.LOGIN_ATTEMPTED:
      return Object.assign({}, state, {
        isLoginStarted: true
      })
    case actions.LOGIN_SUCCEEDED:
      return Object.assign({}, state, {
        isLogged: true,
        isLoginStarted: false,
        session: Object.assign({}, initialState)
      })
    case actions.LOGIN_FAILED:
      return Object.assign({}, state, {
        isLoginStarted: false,
        isLogged: false
      })

    //GET SESSION
    case actions.GET_SESSION_FAILED:
      return Object.assign({}, state, {
        isLogged: false
      })
    case actions.GET_SESSION_SUCCEEDED:
      return Object.assign({}, state, {
        isLogged: true,
        session: session(state.session, action)
      })

    //LOGOUT
    case actions.LOGOUT_SUCCEEDED:
      return Object.assign({}, state, {
        isLogged: false,
        logging: false,
        isRegistering: false,
        session: session(state.session, action)
      })

    //REGISTER
    case actions.REGISTER_FAILED:
      return Object.assign({}, state, {
        isRegistering: false
      })
    case actions.REGISTER_ATTEMPTED:
      return Object.assign({}, state, {
        isRegistering: true
      })
    case actions.REGISTER_SUCCEEDED:
      return Object.assign({}, state, {
        isRegistering: false,
        isLogged: true,
        session: session(state.session, action)
      })
    default:
      return state
  }
}
