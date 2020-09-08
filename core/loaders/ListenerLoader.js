const { Loader } = require('../structures')

const fs = require('fs')

class ListenerLoader extends Loader {
  constructor (client) {
    super(client)
  }

  async load () {
    try {
      await this.initializeListeners()
    } catch (error) {
      this.client.log(error)
    }
  }

  initializeListeners (directory = 'core/listeners') {
    const listeners = fs.readdirSync(directory)
    for (const fileName of listeners) {
      const listener = new (require(`../listeners/${fileName}`))(this.client)
      this.client.on(fileName.split('.')[0], (...v) => listener['event' + listener.constructor.name](...v))
    }
  }
}

module.exports = ListenerLoader
