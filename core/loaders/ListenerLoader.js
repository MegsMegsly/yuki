const { Loader } = require('../structures')
const { FileUtils } = require('../utils')

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
    return FileUtils.requireDirectory(directory, (Listener, event) => {
      const listener = new Listener(this.client)
      this.client.on(event, (...v) => listener['event' + listener.constructor.name](...v))
    }, (error) => this.client.log(error))
  }
}

module.exports = ListenerLoader
