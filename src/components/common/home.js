import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

export function Home({t}) {
  return (
    <div className='main-content wrapper'>
      <h3 className='gamma'>{t('home.title')}</h3>
      <div className='button-wrap g'>
        <div className='gi one-third gutter'>
          <div className='box'>
            <h1 className='box-title'><span className='fa fa-shopping-basket'></span>Ingredients</h1>
            <div className='box-buttons'>
              <Link className='button button-secondary' to="/ingredients">{t('home.ingredientsLink')}</Link>
              {' '}
              <Link className='button button-primary' to="/ingredients/create">{t('home.createIngredientLink')}</Link>
            </div>
          </div>
        </div>
        <div className='gi one-third gutter'>
          <div className='box'>
            <h1 className='box-title'><span className='fa fa-cutlery'></span>Dish</h1>
            <div className='box-buttons'>
              <Link className='button button-secondary' to="/dishes">{t('home.dishesLink')}</Link>
              {' '}
              <Link className='button button-primary' to="/dishes/create">{t('home.createDishLink')}</Link>
            </div>
          </div>
        </div>
        <div className='gi one-third'>
          <div className='box'>
            <h1 className='box-title'><span className='fa fa-shopping-cart'></span>Orders</h1>
            <div className='box-buttons'>
              <Link className='button button-secondary' to="/orders">{t('home.ordersLink')}</Link>
              {' '}
              <Link className='button button-primary' to="/orders/create">{t('home.createOrderLink')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default translate(['common'])(Home);
