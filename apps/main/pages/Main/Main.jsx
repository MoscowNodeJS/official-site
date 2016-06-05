import React, { Component } from 'react'
import { Content, Header, Layout } from '../../../../components/layout'
import { Announcement, TalkList } from './components'

class Main extends Component {

  render () {
    return (
      <Layout>
        <Header title='Moscow NodeJS Meetup' />
        <Content>
          <Announcement />
          <TalkList />
        </Content>
      </Layout>
    )
  }
}
export default Main
