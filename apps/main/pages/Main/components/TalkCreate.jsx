import React, { Component, PropTypes } from 'react'

class TalkCreate extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  render () {
    return (
      <div style={styles.container}>
        <h4>Wanna give a talk? Fill the form. Format: ~5 min, ~10 slides</h4>
        <input ref='name' style={styles.input} placeholder='Name' />
        <textarea ref='description' style={styles.input} placeholder='Description' />
        <a style={styles.button} onClick={this.onClick}>Create</a>
      </div>
    )
  }

  onClick = () => {
    let name = this.refs.name.value
    let description = this.refs.description.value

    if (!name || !description) return window.alert('Name and Description are required')

    this.refs.name.value = ''
    this.refs.description.value = ''

    let { model } = this.context
    let userId = model.get('_session.userId')
    let date = model.date()

    let talk = {
      name,
      description,
      userId,
      date
    }
    model.add('talks', talk)
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50
  },
  input: {
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    padding: 5,
    textAlign: 'center',
    backgroundColor: '#669F64',
    color: '#222',
    cursor: 'pointer'
  }
}

export default TalkCreate
