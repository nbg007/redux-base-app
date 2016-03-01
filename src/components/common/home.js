import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

export function Home({t}) {
  return (
    <div className='main-content'>
      <h3>{t('home.title')}</h3>
      <div className='button-wrap'>
        <p><Link className='button button-primary' to="/ingredients">{t('home.ingredientsLink')}</Link>
        {' '}
        <Link className='button button-primary' to="/ingredients/create">{t('home.createIngredientLink')}</Link></p>

        <p><Link className='button button-primary' to="/dishes">{t('home.dishesLink')}</Link>
        {' '}
        <Link className='button button-primary' to="/dishes/create">{t('home.createDishLink')}</Link></p>

        <p><Link className='button button-primary' to="/orders">{t('home.ordersLink')}</Link>
        {' '}
        <Link className='button button-primary' to="/orders/create">{t('home.createOrderLink')}</Link></p>
      </div>
    </div>
  );
}

export default translate(['common'])(Home);
