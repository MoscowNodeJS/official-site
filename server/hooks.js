import store from './store'

const adminEmails = process.env.ADMINS.split(',')

store.clientHook = async (channel, session, params) => {
  // some code that runs after client connection
  // good place for knowing if client is online

  // let model = store.createModel()
  //
  // let { userId } = session
  //
  // model.set(['users', userId, 'online'], true)
  // model.set(['users', userId, 'lastSeen'], Date.now())
  //
  // channel.on('close', () => {
  //   model.set(['users', userId, 'online'], false)
  //   model.set(['users', userId, 'lastSeen'], Date.now())
  // })
}

store.preHook = async (op, session, params) => {
  // some code that runs before op is applied
  // good place for validation and access control
  let { type, collectionName, docId, field, value } = op
  // console.log('preHook', type, collectionName, docId, field, value, session, params)

  let { server } = params
  // allow all server ops
  if (server) return

  // read ops
  if (type === 'qfetch' && collectionName === 'talks') return
  if (type === 'qsub' && collectionName === 'talks') return
  if (type === 'qfetch' && collectionName === 'votes') return
  if (type === 'qsub' && collectionName === 'votes') return
  if (type === 'fetch' && collectionName === 'users') return
  if (type === 'sub' && collectionName === 'users') return

  // auth
  if (!session) throw new Error('Not auth access denied')
  let { userId } = session
  let model = store.createModel()

  if (collectionName === 'talks' && type === 'add') {
    let talk = value
    if (!talk.name || !talk.description || !talk.userId || !talk.date) {
      throw new Error('Talk should contain all fields')
    }
    if (talk.userId === userId) return
  }

  if (collectionName === 'talks' && type === 'set') {
    let user = await model.fetchAndGet('users', userId)
    let isAdmin = adminEmails.indexOf(user.email) !== -1
    if (isAdmin) return

    let talk = await model.fetchAndGet('talks', docId)
    if (talk.userId === userId) return
  }

  if (collectionName === 'votes' && type === 'add') {
    let vote = value
    if (!vote.talkId || !vote.userId || !vote.date) {
      throw new Error('Vote should contain all fields')
    }
    let user = await model.fetchAndGet('users', vote.userId)
    let talk = await model.fetchAndGet('talks', vote.talkId)
    if (user && talk && talk.userId !== userId) return
  }

  if (collectionName === 'votes' && type === 'del') {
    let vote = await model.fetchAndGet('votes', docId)
    if (vote && vote.userId === userId) return
  }

  model.destroy()

  // deny everything by default if not allowed explicitly
  throw new Error('Access denied')
}

store.afterHook = async (op, session, params) => {
  // some code that runs after op is applied
  // good place to trigger some logic, like external services or sending emails

  let { type, collectionName, docId, field, value } = op
  console.log('afterHook', type, collectionName, docId, field, value)
  let model = store.createModel()

  if (collectionName === 'auths' && type === 'add') {
    let user = value
    let userId = docId

    let $user = model.doc('users', userId)
    await $user.fetch()

    // set creating date to user
    await $user.set('dateCreated', Date.now())

    // if registration with with github, set user fields from
    // provider data
    if (user.github) {
      if (user.github.emails && user.github.emails.length) {
        for (let githubEmail of user.github.emails) {
          await $user.set('email', githubEmail.value)
          break
        }
      } else if (user.github._json.email) {
        await $user.set('email', user.github._json.email)
      }

      await $user.set('name', user.github.displayName)
      await $user.set('username', user.github.username)
    }
  }

  if (collectionName === 'votes' && type === 'add') {
    let vote = value
    let $talk = model.doc('talks', vote.talkId)
    await $talk.fetch()
    $talk.increment('votes', 1)
  }

  if (collectionName === 'votes' && type === 'del') {
    let { prev } = params
    let vote = prev
    let $talk = model.doc('talks', vote.talkId)
    await $talk.fetch()
    $talk.increment('votes', -1)
  }

  model.destroy()
}
