const mongoose = require('mongoose')

class Mongo {
  constructor () {}

  _connect (URI = process.env.MONGO_URI) {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
  }
}

module.exports = Mongo
