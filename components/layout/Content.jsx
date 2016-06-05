import React, { Component, PropTypes } from 'react'

class Content extends Component {

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
      <div style={styles.container}>
        <div style={{...styles.content, ...style}}>
          {children}
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/img/tower.svg)',
    backgroundRepeat: 'no-repeat'
  },
  content: {
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center'
  }
}

export default Content
