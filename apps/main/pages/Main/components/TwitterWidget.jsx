import React, { Component } from 'react'

const widgetProps = {
  'data-widget-id': '733697602319974400'
}

class TwitterWidget extends Component {

  componentDidMount () {
    let link = this.refs.link
    if (this.initialized) return

    let js = document.createElement('script')
    js.id = 'twitter-wjs'
    js.src = '//platform.twitter.com/widgets.js'
    link.parentNode.appendChild(js)
  }

  render () {
    return (
      <a ref='link' className='twitter-timeline' href='https://twitter.com/MoscowNodeJS' {...widgetProps}>Tweets by @MoscowNodeJS</a>
    )
  }
}

export default TwitterWidget
