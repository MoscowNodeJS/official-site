import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import auth from 'amelisa-auth'
import bodyParser from 'body-parser'

import authOptions from './auth'
import router from './router'
import session from './session'
import store from './store'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.dev.babel'

let compiler = webpack(webpackConfig)

let app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
  app.use(webpackHotMiddleware(compiler))
}

app
  .use(favicon(path.join(__dirname, '../public/img/favicon.ico')))
  .use(express.static(process.cwd() + '/public'))
  .use(session)
  .use(bodyParser.json())
  .use(store.modelMiddleware())
  .use(auth.middleware(store, authOptions))
  .use(router)

export default app
