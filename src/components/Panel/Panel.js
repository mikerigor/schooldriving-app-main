import React from 'react'
import PropTypes from 'prop-types';

import './panel.style.scss'

export default function Panel(props) {
  const { children } = props

  return (
    <div className="panel">
      {children}
    </div>
  )
}

Panel.propTypes = {
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {}
