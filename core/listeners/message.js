const _ = require('lodash')

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
      command.requirements = _.defaults(command.requirements, {
        devOnly: false,
        parameters: false,
        permissions: []
      })

      if (command.requirements.devOnly && message.author.id !== process.env.OWNER_ID) return

      if (command.requirements.parameters && !parameters.length) {
        return message.channel.send(`${prefix}${command.name} ${command.usage}`, { code: 'fix' })
      }

      if (command.requirements.permissions.length) {
        const requiredPermissions = _.difference(command.requirements.permissions, message.member.permissions.toArray())

        if (requiredPermissions.length) return message.channel.send(`⛔ Required permissions: \`${command.requirements.permissions}\``)
      }

      command.execute(message)
    } catch (error) {
      this.client.log(error)
    }
  }
}

module.exports = Message
