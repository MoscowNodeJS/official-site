import React, { Component } from 'react'

class Slides extends Component {

  render () {
    return (
      <div style={styles.container}>
        <h1>Slides</h1>
        <h3>Meetup 6</h3>
        {this.renderLink('/slides/m6/m6-ecommerce-migration-from-bitrix-to-nodejs.pdf', 'E-Commerce migration from Bitrix to NodeJS')}
        {this.renderLink('/slides/m6/m6-flowscript', 'Flowscript')}
        {this.renderLink('/slides/m6/m6-react-ssr-performance', 'React SSR performance')}
        {this.renderLink('/slides/m6/m6-nodejs-fatal-mistake.pdf', 'NodeJS Fatal Mistake')}
        <h3>Meetup 8</h3>
        {this.renderLink('/slides/m8/m8-digest.pdf', 'Digest')}
        {this.renderLink('/slides/m8/m8-microservices.pdf', 'Microservice architecture')}
        {this.renderLink('/slides/m8/m8-deis.pdf', 'Deis')}
        {this.renderLink('/slides/m8/m8-ci.pdf', 'Microservices & Continuous Integration')}
      </div>
    )
  }

  renderLink = (href, name) => {
    return (
      <p style={styles.linkContainer}>
        <a style={styles.link} href={href} target='_blank'>{name}</a>
      </p>
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
  header: {
    margin: 20
  },
  linkContainer: {
    padding: 5
  },
  link: {
    color: '#669F64'
  }
}

export default Slides
