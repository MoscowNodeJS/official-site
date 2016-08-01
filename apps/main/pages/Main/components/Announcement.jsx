import React, { Component } from 'react'

class Announcement extends Component {

  render () {
    return (
      <div style={styles.container}>
        <h1>
          Next Meetup -&nbsp;
          <a style={styles.link} href='http://www.meetup.com/Moscow-NodeJS-Meetup' target='_blank'>coming soon</a>
        </h1>
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
  link: {
    color: '#669F64'
  }
}

export default Announcement
