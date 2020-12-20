const { Listener } = require('../structures')

class Error extends Listener {
  constructor (client) {
    super(client)
  }

  eventError (error) {
    this.client.log(error)
  }
}

module.exports = Error
