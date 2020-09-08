const mongoose = require('mongoose')

const { GuildRepository } = require('./repositories')

class Mongo {
  constructor () {}

  _connect (URI = process.env.MONGO_URI) {
    return mongoose.connect(URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }).then(() => {
      this.guilds = new GuildRepository()
    })
  }
}

module.exports = Mongo
