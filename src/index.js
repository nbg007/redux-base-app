// Architecture file
import './main.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, createRoutes, browserHistory } from 'react-router'
import { I18nextProvider } from 'react-i18next' // as we build ourself via webpack
import i18n from './utils/i18n'

import configureRoutes from './routes'
import configureStore from './store/configureStore'
import coreReducers from './modules/core'
import ReducerRegistry from './reducer-registry'

var reducerRegistry = new ReducerRegistry(coreReducers)

// Configure hot module replacement for core reducers
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./modules/core', () => {
      var nextCoreReducers = require('./modules/core')
      reducerRegistry.register(nextCoreReducers)
    })
  }
}

const routes = configureRoutes(reducerRegistry)
const store = configureStore(reducerRegistry)

render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
