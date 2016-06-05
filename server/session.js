import session from 'express-session'
import connect from 'connect-mongo'
import store from './store'

let MongoStore = connect(session)

let sessionOptions = {
  secret: 'secret',
  store: new MongoStore({
    db: store.storage.db // reuse same connection
  }),
  resave: true,
  saveUninitialized: true
}

export default session(sessionOptions)
