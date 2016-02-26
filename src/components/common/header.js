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
      <header>
        <h1>{t('appName')}:{title}</h1>
        {' '}
        <Interpolate parent='p' i18nKey='content.welcome' value={username} />
        <Link to="/">{t('home')}</Link>
        {' '}
        <Link to="/ingredients">{t('ingredients')}</Link>
        {' '}
        <Link to="/dishes">{t('dishes')}</Link>
        {' '}
        <Link to="/orders">{t('orders')}</Link>
        {' '}
        <Notifications notifications={notifications}/>
        {' '}
        <a href onClick={this.handleClick.bind(this)}>{t('logout')}</a>
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
