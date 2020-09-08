const { Loader } = require('../structures')

const Mongo = new (require('../database/Mongo.js'))()

class DatabaseLoader extends Loader {
  constructor (client) {
    super(client)
  }

  async load () {
    try {
      await this.initializeDatabase()
    } catch (error) {
      this.client.log(error)
    }
  }

  initializeDatabase () {
    Mongo._connect()
      .then(() => this.client.log('Initalized database'))
      .catch((error) => this.client.log(error.message))
  }
}

module.exports = DatabaseLoader
