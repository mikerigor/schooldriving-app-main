import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

import './notification.styles.scss';

function Notification(props, ref) {
  const [notification, setNotification] = useState({ isNotificationShow: false, message: '', type: 'succes' })

  useImperativeHandle(ref, () => ({ success, error }))

  const success = (msg) => {
    notificationShowHide('succes', msg)
  }
  const error = (msg) => {
    notificationShowHide('error', msg)
  }

  const notificationShowHide = (status, msg) => {
    setNotification({
      message: msg,
      type: status,
      isNotificationShow: true
    })
    setTimeout(() => {
      setNotification({
        message: msg,
        type: status,
        isNotificationShow: false
      })
    }, 3000)
  }
  return (
    <div className={`notification ${notification.isNotificationShow ? 'show' : 'hide'}`}>
      <span className={`alert ${notification.type === 'succes' ? 'alert-success' : 'alert-danger'}`}>
        {notification.message}
      </span>
    </div>
  )
}

Notification.propTypes = {
};
Notification.defaultProps = {
}
export default forwardRef(Notification)
