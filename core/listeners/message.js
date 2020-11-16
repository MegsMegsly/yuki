const { Listener } = require('../structures')

class Message extends Listener {
  constructor (client) {
    super(client)
  }

  async eventMessage (message) {
    try {
      const { prefix } = await this.client.database.guilds.findOne(message.guild.id)

      if (message.author.bot || !message.content.startsWith(prefix)) return
      const parameters = message.content.slice(prefix.length).split(/ +/)
      const commandName = parameters.shift().toLowerCase()
      const command = this.client.commands.get(commandName) || this.client.commands.find((command) => command.aliases && command.aliases.includes(commandName))

      if (!command) return

      message.parameters = parameters

      command.execute(message)
    } catch (error) {
      this.client.log(error)
    }
  }
}

module.exports = Message
