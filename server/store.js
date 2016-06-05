import MongoStorage from 'amelisa-mongo/MongoStorage'
import { Store } from 'amelisa'

let storage = new MongoStorage(process.env.MONGO_URL)

const options = {
  version: 1,
  storage,
  collections: {
    auths: {
      client: false
    },
    users: {
      client: true
    },
    talks: {
      client: true
    },
    votes: {
      client: true
    }
  },
  projections: {
    users: {
      collectionName: 'auths',
      fields: {
        id: true,
        email: true,
        username: true,
        name: true,
        dateCreated: true,
        admin: true
      }
    }
  }
}

let store = new Store(options)

export default store
