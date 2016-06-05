import React, { Component } from 'react'

class Announcement extends Component {

  render () {
    return (
      <div style={styles.container}>
        <h1>Next Meetup - end of June</h1>
        <a style={styles.details} href='http://www.meetup.com/Moscow-NodeJS-Meetup' target='_blank'>Details</a>
      </div>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#222'
  },
  details: {
    color: '#fff'
  }
}

export default Announcement
