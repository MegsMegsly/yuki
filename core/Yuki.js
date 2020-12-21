const { Client } = require('./structures')

const Loaders = require('./loaders')

class Main extends Client {
  constructor () {
    super({
      disableMentions: 'everyone'
    })

    this.initializeLoaders()
  }

  async initializeLoaders () {
    for (const name in Loaders) {
      await new Loaders[name](this).load()
    }
  }
}

const client = new Main()

client.login().catch((error) => client.log(error.message))
