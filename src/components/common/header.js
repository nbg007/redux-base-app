import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import Notifications from '../notifications/notifications'
import { translate, Interpolate } from 'react-i18next/lib'

export class Header extends Component {
  handleClick(e) {
    e.preventDefault()
    this.props.onLogout()
  }
  render() {
    const {title, username, modalIsOpen, notifications, t} = this.props
    return (
      <header className='main-header'>
        <div className='header-nav clearfix'>
          <div className='wrapper'>
            <h1 className='app-title'>{t('appName')}:{title}</h1>
            {' '}
            <nav className='main-navigation'>
              <Link className='nav-item' to="/">{t('home')}</Link>
              {' '}
              <Link className='nav-item' to="/ingredients">{t('ingredients')}</Link>
              {' '}
              <Link className='nav-item' to="/dishes">{t('dishes')}</Link>
              {' '}
              <Link className='nav-item' to="/orders">{t('orders')}</Link>
              {' '}
              <Notifications notifications={notifications}/>
              {' '}
              <a className='nav-item' href onClick={this.handleClick.bind(this)}>{t('logout')}</a>
            </nav>
          </div>
        </div>
        <div className='header-intro'>
          <div className='wrapper'>
            <Interpolate parent='p' i18nKey='content.welcome' value={username} />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  username: PropTypes.string,
  notifications: PropTypes.array,
  onLogout: PropTypes.func.isRequired
}

export default translate(['header', 'common'])(Header);
