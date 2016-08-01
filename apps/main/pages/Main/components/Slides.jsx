import React, { Component } from 'react'

class Slides extends Component {

  render () {
    return (
      <div style={styles.container}>
        {/* <h1>Meetups</h1> */}
        <h1>Meetup 6</h1>
        {this.renderLink('E-commerce migration from Bitrix to NodeJS', 'izatop', '/slides/m6/m6-ecommerce-migration-from-bitrix-to-nodejs.pdf', 'https://www.youtube.com/watch?v=p2COT7lIQ3c&index=3&list=PL5T6FDwtwmh4C7zWRCpC9GNMOb580DIHu')}
        {this.renderLink('Flowscript', 'vkurchatkin', '/slides/m6/m6-flowscript', 'https://www.youtube.com/watch?v=BAogrBclw7g&list=PL5T6FDwtwmh4C7zWRCpC9GNMOb580DIHu&index=2')}
        {this.renderLink('React SSR performance', 'maiordom', '/slides/m6/m6-react-ssr-performance', 'https://www.youtube.com/watch?v=D1vl-WWwFlc&list=PL5T6FDwtwmh4C7zWRCpC9GNMOb580DIHu&index=1')}
        {this.renderLink('NodeJS Fatal Mistake', 'aiboy', '/slides/m6/m6-nodejs-fatal-mistake.pdf', 'https://www.youtube.com/watch?v=STyocIjskBE&list=PL5T6FDwtwmh4C7zWRCpC9GNMOb580DIHu&index=4')}
        <h1>Meetup 8</h1>
        {this.renderLink('Digest', '', '/slides/m8/m8-digest.pdf', '')}
        {this.renderLink('Microservice architecture', 'DenisIzmaylov', '/slides/m8/m8-microservices.pdf', 'https://www.youtube.com/watch?v=pq2swO_zRk8')}
        {this.renderLink('Deis', 'vmakhaev', '/slides/m8/m8-deis.pdf', 'https://www.youtube.com/watch?v=xBW0qWF9H3s')}
        {this.renderLink('Microservices & Continuous Integration', 'AVVS', '/slides/m8/m8-ci.pdf', 'https://www.youtube.com/watch?v=skdmxAM2lVU')}
      </div>
    )
  }

  renderLink = (name, username, slidesUrl, videoUrl) => {
    return (
      <p style={styles.linkContainer}>
        {name}&nbsp;
        {username && <span>by <a style={styles.username} href={`http://github.com/${username}`} target='_blank'>{username}</a>&nbsp;</span>}
        {slidesUrl && <a style={styles.link} href={slidesUrl} target='_blank'>(Slides)</a>}
        &nbsp;
        {videoUrl && <a style={styles.link} href={videoUrl} target='_blank'>(Video)</a>}
      </p>
    )
  }
}

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    padding: 20,
    backgroundColor: '#222'
  },
  linkContainer: {
    paddingTop: 5,
    paddingBottom: 5
  },
  link: {
    color: '#669F64'
  },
  username: {
    color: '#669F64'
  }
}

export default Slides
