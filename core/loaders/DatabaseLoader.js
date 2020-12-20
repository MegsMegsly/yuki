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
    this.client.database = Mongo
    Mongo._connect()
      .then(() => this.client.log('Initalized database'))
      .catch((error) => {
        this.client.log(error.message)
        this.client.database = null
      })
  }
}

module.exports = DatabaseLoader
