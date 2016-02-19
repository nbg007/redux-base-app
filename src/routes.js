import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { FadeTransition, SlideRightTransition } from './components/transitions'

/* Route handlers/smart */
import App from './components/layouts/app'
import Landing from './components/layouts/landing'
import Home from './components/common/home'
import Ingredients from './components/ingredients/ingredients'
import ListIngredients from './containers/list-ingredients'
import CreateIngredient from './containers/create-ingredient'
import ShowIngredient from './containers/show-ingredient'
import Orders from './components/orders/orders'
import CreateOrder from './containers/create-order'
import ListOrders from './containers/list-orders'
import ShowOrder from './containers/show-order'
import Dishes from './components/dishes/dishes'
import CreateDish from './containers/create-dish'
import ListDishes from './containers/list-dishes'
import ShowDish from './containers/show-dish'
import Login from './containers/login'
import Register from './containers/register'

import { checkLogged, validateToken } from './modules/auth'
import { fetchDish } from './modules/dishes'
import { fetchOrder} from './modules/orders'

export default (
  <Route>
    <Route component={Landing} onEnter={(dispatch, cb) => dispatch(checkLogged(cb))}>
      <Route component={FadeTransition}>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Route>
    </Route>
    <Route component={App} onEnter={(dispatch, cb) => dispatch(validateToken(cb))}>
      <Route  path= "/" component={Home} />
      <Route path="ingredients" component={Ingredients}>
        <Route component={SlideRightTransition}>
          <IndexRoute component={ListIngredients}/>
          <Route path="create" component={CreateIngredient}/>
          <Route path=":id/show" component={ShowIngredient}/>
          <Route path=":id/edit" component={CreateIngredient}/>
        </Route>
      </Route>
      <Route path="dishes" component={Dishes}>
        <Route component={SlideRightTransition}>
          <IndexRoute component={ListDishes}/>
          <Route path="create" component={CreateDish}/>
          <Route path=":id/edit" component={CreateDish} />
          <Route path=":id/show" component={ShowDish} />
        </Route>
      </Route>
      <Route path="orders" component={Orders}>
        <Route component={SlideRightTransition}>
          <IndexRoute component={ListOrders}/>
          <Route path="create" component={CreateOrder}/>
          <Route path=":id/edit" component={CreateOrder} />
          <Route path=":id/show" component={ShowOrder} />
        </Route>
      </Route>
    </Route>
  </Route>
)
