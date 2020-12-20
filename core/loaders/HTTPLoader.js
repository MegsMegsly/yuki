const { Loader } = require('../structures')

const express = require('express')

class HTTPLoader extends Loader {
  constructor (client) {
    super(client)
  }

  async load () {
    try {
      await this.initializeHTTP()
    } catch (error) {
      this.client.log(error)
    }
  }

  initializeHTTP (port = process.env.PORT) {
    this.app = express()

    this.app.get('/', (request, response) => response.sendStatus(200))

    this.app.listen(port, () => this.client.log(`Server running on port ${port}`))
  }
}

module.exports = HTTPLoader
