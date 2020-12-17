const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'prefix',
  aliases: ['setprefix', 'newprefix'],
  description: 'Server prefix manager',
  category: 'configuration',
  usage: '<new prefix|(reset)>',
  requirements: { permissions: ['MANAGE_GUILD'] },
  async execute (message) {
    try {
      const guild = await message.client.database.guilds.findOne(message.guild.id)

      if (!message.parameters[0]) {
        if (guild && guild.prefix) {
          message.channel.send(new MessageEmbed()
            .setDescription(`Current prefix: \`${guild.prefix}\``)
          )
        }
      } else if (message.parameters[0] && message.parameters[0].toLowerCase() === 'reset') {
        await message.client.database.guilds.update(message.guild.id, { $set: { prefix: process.env.YUKI_PREFIX } })
        message.channel.send(new MessageEmbed()
          .setDescription(`Reseted prefix: \`${guild.prefix}\``)
        )
      } else {
        await message.client.database.guilds.update(message.guild.id, { $set: { prefix: message.parameters[0] } })
        message.channel.send(new MessageEmbed()
          .setDescription(`New prefix: \`${message.parameters[0]}\``)
        )
      }
    } catch (error) {
      message.channel.send(`Error: ${error.message}`, { code: 'js' })
    }
  }
}
