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
    const {title, username, modal, notifications, t, toggleModal} = this.props
    return (
      <header>
        <h1>{t('appName')}:{title}</h1>
        {' '}
        <p>{t('content.welcome', {value: username})}</p>
        {' '}
        <Link to="/">{t('home')}</Link>
        {' '}
        <Link to="/ingredients">{t('ingredients')}</Link>
        {' '}
        <Link to="/dishes">{t('dishes')}</Link>
        {' '}
        <Link to="/orders">{t('orders')}</Link>
        {' '}
        <Notifications notifications={notifications} modal={modal} toggleModal={toggleModal}/>
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
