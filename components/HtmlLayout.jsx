import React, { Component, PropTypes } from 'react'

class HtmlLayout extends Component {

  static propTypes = {
    app: PropTypes.string,
    children: PropTypes.any,
    model: PropTypes.object
  }

  render () {
    let { app, children, model, css } = this.props
    let json = model.getBundleJson()
    let style

    if (process.env.NODE_ENV !== 'development') {
      style = <style>{css}</style>
      // style = <link href={`/css/apps/${app}.styles.css`} rel='stylesheet' type='text/css' />
    }

    return (
      <html>
        <head>
          <title>Moscow NodeJS Meetup</title>
          <meta name='description' content='Official web-site for Moscow NodeJS Meetup' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta charSet='utf-8' />
          {style}
        </head>
        <body style={styles.body}>
          <div id='root'>{children}</div>
          <script defer src={`/js/${app}.bundle.js`} />
          <script type='application/json' id='bundle' dangerouslySetInnerHTML={{__html: json}}></script>
        </body>
      </html>
    )
  }
}

const styles = {
  body: {
    padding: 0,
    margin: 0,
    fontFamily: 'monospace',
    fontSize: 20,
    color: '#669F64',
    backgroundColor: '#222'
  }
}

export default HtmlLayout
