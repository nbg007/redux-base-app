import { applyMiddleware } from 'redux'
import expect from 'expect'
import thunk from 'redux-thunk'
import api from '../../middleware/api'
import config from '../../config'
import nock from 'nock'

const middlewares = [ thunk , api ]


// ------- MOCKS
//
/*
 * Returns a nock header to mock API reqs
 */
export function getMockedAPIRequest(headers) {
  return nock(config.api, headers);
}

/*
 * Creates a mock of Redux store with middleware.
 */
export function mockStore(getState, expectedActions, onLastAction) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof onLastAction !== 'undefined' && typeof onLastAction !== 'function') {
    throw new Error('onLastAction should either be undefined or function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()
        console.log("action", action)
        console.log("expected action", expectedAction)
        expect(action).toHaveKeysWithExpectedValue(expectedAction)
        if (onLastAction && !expectedActions.length) {
          onLastAction()
        }
        return action
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}
