import React, { Component, PropTypes } from 'react'

class Layout extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.any
  }

  render () {
    let { children, style = {} } = this.props

    return (
      <div style={{...styles.layout, ...style}}>
        {children}
      </div>
    )
  }
}

const styles = {
  layout: {
    backgroundColor: '#222'
  }
}

export default Layout
