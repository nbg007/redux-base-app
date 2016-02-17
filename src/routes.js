import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { FadeTransition, SlideRightTransition } from './components/transitions'

/* Route handlers/smart */
import App from './containers/app'
import Landing from './containers/landing'
import Home from './components/home'
import Ingredients from './components/ingredients'
import ListIngredients from './smart/list-ingredients'
import CreateIngredient from './smart/create-ingredient'
import ShowIngredient from './smart/show-ingredient'
import Orders from './components/orders'
import CreateOrder from './smart/create-order'
import ListOrders from './smart/list-orders'
import ShowOrder from './smart/show-order'
import Dishes from './components/dishes'
import CreateDish from './smart/create-dish'
import ListDishes from './smart/list-dishes'
import ShowDish from './smart/show-dish'
import Login from './smart/login'
import Register from './smart/register'

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
