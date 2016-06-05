import '../config'
import http from 'http'
import { Server as WebSocketServer } from 'ws'
import store from './store'
import './hooks'

const port = process.env.PORT
let server
let wsServer

async function init () {
  await store.init()

  server = http.createServer()
  wsServer = new WebSocketServer({noServer: true})

  let session = require('./session')
  let app = require('./app')

  server.on('request', app)
  server.on('upgrade', upgrade)

  function upgrade (req, socket, upgradeHead) {
    // copy upgradeHead to avoid retention of large slab buffers used in node core
    let head = new Buffer(upgradeHead.length)
    upgradeHead.copy(head)

    session(req, {}, () => {
      wsServer.handleUpgrade(req, socket, head, (client) => {
        wsServer.emit('connection', client)
      })
    })
  }

  wsServer.on('connection', store.onConnection)

  server.listen(port, (err) => {
    if (err) {
      console.error('Can\'t start server, Error:', err)
    } else {
      console.info(`${process.pid} listening. Go to: http://localhost:${port}`)
    }
  })
}

init().catch((err) => console.log(err, err.stack))

function gracefulShutdown (code) {
  console.log('Trying to close server...')
  wsServer.close()
  server.close(() => {
    console.log('Server is closed, gracefully shutting down')
    process.exit(code)
  })

  setTimeout(() => {
    console.error('Could not close server, forcefully shutting down')
    process.exit(code)
  }, 5000)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
process.on('SIGQUIT', gracefulShutdown)

process.on('uncaughtException', (err) => {
  console.log('uncaughtException:', err, err.stack)
  gracefulShutdown(100)
})
