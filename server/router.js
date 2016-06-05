import fs from 'fs'
import React from 'react'
import { match, RouterContext } from 'react-router'
import { createElement, renderToStaticMarkup } from 'react-amelisa/server'

import HtmlLayout from '../components/HtmlLayout'
import wrap from './wrap'

const appsFolder = process.cwd() + '/apps'
let appsRoutes = {}
let styles = {}

let apps = fs.readdirSync(appsFolder)
for (let app of apps) {
  appsRoutes[app] = require(`${appsFolder}/${app}/Routes`)
  styles[app] = fs.readFileSync(process.cwd() + `/public/css/apps/${app}.styles.css`, 'utf8')
}

async function router (req, res, next) {
  let { app, redirectLocation, renderProps } = await matchAppRoutes(req.url)

  if (redirectLocation) {
    return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  }

  if (!renderProps) return res.status(404).send('Not found')

  let model = req.getModel()

  model.prepareBundle()

  // FIXME: hack for passing model through react-router
  renderProps.location.model = model
  // FIXME: hack to be able overwrite React.createElement
  renderProps.createElement = createElement

  let children = <RouterContext {...renderProps} />

  let css = styles[app]
  let html = await renderToStaticMarkup(HtmlLayout, {model, app, css}, children)
  return res.status(200).send(html)
}

async function matchAppRoutes (location) {
  for (let app in appsRoutes) {
    let routes = appsRoutes[app]

    let { redirectLocation, renderProps } = await matchUrl(location, routes)
    if (redirectLocation || renderProps) {
      return {
        app,
        redirectLocation,
        renderProps
      }
    }
  }
  return {}
}

function matchUrl (location, routes) {
  return new Promise((resolve, reject) => {
    match({routes, location}, (err, redirectLocation, renderProps) => {
      if (err) return reject(err)

      resolve({redirectLocation, renderProps})
    })
  })
}

export default wrap(router)
