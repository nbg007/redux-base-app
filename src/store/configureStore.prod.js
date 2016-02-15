import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../modules'
import api from '../middleware/api'
import {browserHistory} from 'react-router'
import {syncHistory} from 'react-router-redux'

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(syncHistory(browserHistory), thunk, api)
  )
}
