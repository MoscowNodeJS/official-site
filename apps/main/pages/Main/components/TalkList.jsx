import React, { Component } from 'react'
import { createContainer } from 'react-amelisa'
import Talk from './Talk'
import TalkCreate from './TalkCreate'

const adminEmails = process.env.ADMINS.split(',')

class TalkList extends Component {

  subscribe () {
    let { model } = this.context

    let subscribes = {
      talks: ['talks', {$orderby: {votes: -1}}]
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
        <h2>Talks:</h2>
        {talks.map((talk) => <Talk key={talk.id} talk={talk} isAdmin={isAdmin} />)}
        {user && <TalkCreate />}
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
  }
}

export default createContainer(TalkList)
