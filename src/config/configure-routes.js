import React from 'react'
import { Route } from 'react-router'

/* Route handlers/layouts */
import App from '../components/layouts/app'
import Landing from '../components/layouts/landing'
import Home from '../components/common/home'
import Login from '../containers/login'
import Register from '../containers/register'
import MyComponent from '../components/my-component'

export default function configureRoutes(reducerRegistry) {
  return(
    <Route component={App}>
      <Route  path='/' component={Home} />
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
			<Route path='/async' component={MyComponent}/>
      <Route path='/admin' getComponent={(location, cb) => {
        // Webpack code splitting incantation - anything required in the callback
        // will be placed in a new chunk.
        require.ensure([], require => {
          const reducer  = require('../modules/admin').default
          const comp = require('../containers/admin').default
          // Register the reducer depended upon by the screen component
          reducerRegistry.register({admin: reducer})
          // Configure hot module replacement for the reducer
          if (process.env.NODE_ENV !== 'production') {
            if (module.hot) {
              module.hot.accept('../modules/admin', () => {
                reducerRegistry.register({admin: reducer})
              })
            }
          }
          cb(null, comp)
        })
      }}/>
    </Route>
)}
