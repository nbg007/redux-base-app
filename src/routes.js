import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* Route handlers/layouts */
import App from './containers/app'
import Landing from './containers/landing'
import Home from './components/home'
import ListIngredients from './smart/ingredients/list'
import ViewIngredient from './smart/ingredients/view'
import CreateIngredient from './smart/ingredients/create'
import EditIngredient from './smart/ingredients/edit'
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
      <Route path="/" component={ListIngredients} />
      <Route path='ingredients/create' component={CreateIngredient} />
      <Route path='ingredients/:id' component={ViewIngredient} />
      <Route path='ingredients/:id/edit' component={EditIngredient} />
    </Route>
  </Route>
)
