import React, { Component, PropTypes } from 'react'
import { createContainer } from 'react-amelisa'

class Talk extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  subscribe () {
    let { talk } = this.props

    return {
      user: ['users', talk.userId],
      votes: ['votes', {talkId: talk.id}],
      userId: ['_session', 'userId'],
      loggedIn: ['_session', 'loggedIn']
    }
  }

  render () {
    let { talk, user, votes, isAdmin, userId, loggedIn } = this.props
    let { username } = user

    let vote = votes.find((vote) => vote.userId === user.id)
    let canDelete = isAdmin || talk.userId === userId

    return (
      <div style={styles.container}>
        <h3>{talk.name}</h3>
        <div style={styles.description}>{talk.description}</div>
        <div style={styles.actions}>
          <div>
            <span>by </span>
            <a style={styles.username} href={`http://github.com/${username}`} target='_blank'>{username}</a>
          </div>
          <div>
            {canDelete && <a style={styles.del} onClick={this.onDelete}>Del</a>}
            <span> +{talk.votes || 0} </span>
            {loggedIn && (
              talk.userId === userId
                ? <span style={styles.vote}>my</span>
                : <a style={styles.vote} onClick={this.onVote}>{vote ? '-1' : '+1'}</a>
            )}
          </div>
        </div>
      </div>
    )
  }

  onDelete = () => {
    let { talk } = this.props
    let { model } = this.context

    if (window.confirm('Delete?')) {
      model.set(['talks', talk.id, 'deleted'], true)
        .catch((err) => window.alert(err))
    }
  }

  onVote = () => {
    let { talk, votes } = this.props
    let { model } = this.context
    let userId = model.get('_session.userId')

    let vote = votes.find((vote) => vote.userId === userId)

    if (vote) {
      model.del('votes', vote.id)
    } else {
      let date = model.date()

      vote = {
        talkId: talk.id,
        userId,
        date
      }
      model.add('votes', vote)
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20
  },
  description: {
    marginTop: 5,
    marginBottom: 5
  },
  username: {
    color: '#669F64'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  del: {
    padding: 5,
    color: '#222',
    backgroundColor: 'red',
    cursor: 'pointer'
  },
  vote: {
    padding: 5,
    color: '#222',
    backgroundColor: '#669F64',
    cursor: 'pointer'
  }
}

export default createContainer(Talk)
