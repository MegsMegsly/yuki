const { Loader } = require('../structures')
const { FileUtils } = require('../utils')

const { Collection } = require('discord.js')

class CommandLoader extends Loader {
  constructor (client) {
    super(client)

    this.client.commands = new Collection()
    this.client.aliases = new Collection()
  }

  async load () {
    try {
      await this.initializeCommands()
    } catch (error) {
      this.client.log(error)
    }
  }

  initializeCommands (directory = 'core/commands') {
    return FileUtils.requireDirectory(directory, (command) => {
      this.client.commands.set(command.name, command)

      if (command.aliases) {
        command.aliases.forEach((alias) => this.client.aliases.set(alias, command.name))
      }
    }, (error) => this.client.log(error))
  }
}

module.exports = CommandLoader
