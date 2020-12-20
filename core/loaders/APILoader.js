const { Loader } = require('../structures')
const { FileUtils } = require('../utils')

class APILoader extends Loader {
  constructor (client) {
    super(client)

    this.client.apis = {}
  }

  async load () {
    try {
      await this.initializeAPIs()
    } catch (error) {
      this.client.log(error)
    }
  }

  initializeAPIs (directory = 'core/apis') {
    return FileUtils.requireDirectory(directory, (Api, name) => {
      const apis = new Api(this.client)
      this.client.apis[name.toLowerCase()] = apis.load()
    }, (error) => this.client.log(error))
  }
}

module.exports = APILoader
