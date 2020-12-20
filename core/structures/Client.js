const { Client } = require('discord.js')

class Yuki extends Client {
  constructor (clientOptions) {
    super(clientOptions)
  }

  log (message) {
    console.log(message)
  }
}

module.exports = Yuki
