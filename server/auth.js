const options = {
  passport: {
    userProperty: 'userId'
  },
  strategies: {
    github: {
      strategy: require('passport-github2').Strategy,
      conf: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.BASE_URL + '/auth/github/callback'
      }
    }
  }
}

export default options
