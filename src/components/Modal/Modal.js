import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import PropTypes from 'prop-types';

import './modal.style.scss'

function Modal(props, ref) {
  const modal = React.createRef();

  const { buttonText, children, hideButton } = props

  useEffect(() => {
  }, []);

  useImperativeHandle(ref, () => ({
    toggleFromParent() {
      document.querySelector('.modal').style.display = 'block'
    }
  }), [])

  const modalToggle = () => {
    modal.current.style.display = 'block'
  }

  const closeModal = () => {
    modal.current.style.display = 'none'
  }

  return (
    <React.Fragment>
    {
      !hideButton
      && (
      <button
        type="button"
        id="myBtn"
        onClick={modalToggle}
      >
        {buttonText}
      </button>
      )
    }
      <div
        className="modal"
        ref={modal}
      >
        <div className="modal-content">
          <div
            style={{
              width: '100%',
              textAlign: 'right'
            }}
          >
            <button
              type="button"
              className="close"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
          {children}
        </div>
      </div>
    </React.Fragment>
  )
}

Modal.propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  hideButton: PropTypes.bool,
};

Modal.defaultProps = {
  buttonText: {},
  hideButton: false,
}

export default forwardRef(Modal)
