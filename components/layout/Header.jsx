import React, { Component, PropTypes } from 'react'
import { createContainer } from 'react-amelisa'

class Header extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  static propTypes = {
    user: PropTypes.object,
    online: PropTypes.bool,
    loggedIn: PropTypes.bool
  }

  subscribe () {
    let { model } = this.context
    let userId = model.get('_session.userId')
    let loggedIn = model.get('_session.loggedIn')

    let subscribes = {
      loggedIn: ['_session', 'loggedIn']
    }

    if (loggedIn) subscribes.user = ['users', userId]

    return subscribes
  }

  render () {
    let { user, loggedIn } = this.props

    let login
    if (loggedIn) {
      login = (
        <div>
          <span style={styles.username}>{user.username}</span>
          <a style={styles.logout} href='/auth/logout'>Logout</a>
        </div>
      )
    } else {
      login = (
        <a style={styles.login} href='/auth/github'>
          <span>Login</span>
        </a>
      )
    }

    return (
      <div style={styles.header}>
        <div style={styles.logo}>
          <img style={styles.logoIcon} src='/img/basil.svg' />
          <img style={styles.logoIcon} src='/img/nodejs.svg' />
        </div>
        <div style={styles.buttons}>
          <a href='https://twitter.com/MoscowNodeJS' target='_blank'>
            <img style={styles.twitter} src='/img/twitter.svg' />
          </a>
          <a href='https://github.com/MoscowNodeJS/official-site' target='_blank'>
            <img style={styles.github} src='/img/github.svg' />
          </a>
          {login}
        </div>
      </div>
    )
  }
}

const styles = {
  header: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    color: 'white'
  },
  logo: {
    display: 'flex'
  },
  logoIcon: {
    height: 40,
    marginRight: 10
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  twitter: {
    height: 25,
    margin: 5
  },
  github: {
    height: 30,
    margin: 5
  },
  username: {
    color: '#669F64',
    margin: 10
  },
  login: {
    color: '#fff'
  },
  logout: {
    color: '#fff'
  }
}

export default createContainer(Header)
