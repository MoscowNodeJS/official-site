import React, { Component } from 'react'
import { createContainer } from 'react-amelisa'
import Talk from './Talk'
import TalkCreate from './TalkCreate'

const adminEmails = process.env.ADMINS.split(',')

class TalkList extends Component {

  subscribe () {
    let { model } = this.context

    let subscribes = {
      talks: ['talks', {deleted: {$ne: true}, $orderby: {votes: -1}}]
    }

    let loggedIn = model.get('_session.loggedIn')
    if (loggedIn) {
      let userId = model.get('_session.userId')
      subscribes.user = ['users', userId]
    }

    return subscribes
  }

  render () {
    let { talks, user } = this.props

    let isAdmin = user && adminEmails.indexOf(user.email) !== -1

    return (
      <div style={styles.container}>
        <h1>Talks</h1>
        {talks.map((talk) => <Talk key={talk.id} talk={talk} isAdmin={isAdmin} />)}
        {user && <TalkCreate />}
        {!user && (
          <div>
            <a style={styles.login} href='/auth/github'>
              <span>Login</span>
            </a>
            <span> to add a talk or vote</span>
          </div>
        )}
      </div>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    padding: 20,
    paddingBottom: 50,
    backgroundColor: '#222'
  },
  login: {
    color: '#fff'
  }
}

export default createContainer(TalkList)
