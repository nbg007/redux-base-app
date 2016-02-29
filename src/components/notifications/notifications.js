import React, { PropTypes, Component } from 'react'
import Modal from 'react-modal'
import { translate } from 'react-i18next/lib'

export const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export function Notification({id, name, stock, t}) {
  return (
    <div>
      {t('notifications.count', {name: name, stock: stock})}
    </div>
  )
}

export class Notifications extends Component {
  render() {
    const { notifications, t, modal, toggleModal } = this.props
    const hasElements = notifications.length > 0
    const list = !hasElements ?
      <em>{t('notifications.empty')}</em> :
      notifications.map(e =>
        <Notification
          stock={e.stock}
          name={e.name}
          key={e.id}
          t={t}/>
    )
    return (
      <div className='notifications'>
        <button onClick={() => toggleModal(modal.id)}>{t("notifications.title")}</button>
        <Modal
          isOpen={modal.isOpen}
          style={customStyles} >

          <h3>{t('notifications.title')}</h3>
          <li>{list}</li>
          <button onClick={() => toggleModal(modal.id)}>{t('notifications.closeButton')}</button>
        </Modal>
      </div>
    )
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array
}

export default translate(['common'])(Notifications)
