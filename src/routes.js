import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* Route handlers/layouts */
import App from './containers/app'
import Landing from './containers/landing'
import Home from './components/home'
import Ingredients from './smart/ingredients';
import Login from './smart/login'
import Register from './smart/register'

import { checkLogged, validateToken } from './modules/auth'

export default (
  <Route>
    <Route component={Landing}>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
    </Route>
    <Route component={App}>
      <Route  path= "/" component={Ingredients} />
    </Route>
  </Route>
)
