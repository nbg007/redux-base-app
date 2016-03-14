import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import configureReducers from '../configure-reducers'
import api from '../middleware/api'
import {browserHistory} from 'react-router'
import {syncHistory} from 'react-router-redux'
import DevTools from '../components/common/dev-tools'

const reduxRouter = syncHistory(browserHistory)

export default function configureStore(reducerRegistry, initialState) {
  const reducer = configureReducers(reducerRegistry.getReducers()) 
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(reduxRouter, thunk, api),
      DevTools.instrument()
    )
  )

  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(configureReducers(reducers))
  })


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../configure-reducers', () => {
      const nextReducer = require('../configure-reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
