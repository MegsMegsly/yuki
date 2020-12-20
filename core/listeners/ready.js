const { Listener } = require('../structures')

class Ready extends Listener {
  constructor (client) {
    super(client)
  }

  eventReady () {
    this.client.log(this.client.user)
  }
}

module.exports = Ready
