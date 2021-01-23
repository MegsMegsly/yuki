const { MessageEmbed } = require('discord.js')

const DiscordUtils = require('../../utils/DiscordUtils.js')

module.exports = {
  name: 'avatar',
  aliases: ['photo'],
  description: 'Get avatar or guild icon',
  usage: '<@user>',
  category: 'utility',
  async execute (message) {
    if (message.parameters[0]?.toLowerCase() === 'server') {
      const icon = message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 })
      
      message.channel.send(new MessageEmbed()
        .setTitle(message.guild.name)
        .setDescription(`🏞️ **[Icon URL](${icon})**`)
        .setImage(icon)
      )
    } else {
      const target = await message.client.users.fetch(DiscordUtils.resolveUser(message))

      message.client.users.fetch(target.id)
        .then((user) => {
          const icon = user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })

          message.channel.send(new MessageEmbed()
            .setTitle(user.tag)
            .setDescription(`🏞️ **[Icon URL](${icon})**`)
            .setImage(icon)
          )
        })
    }
  }
}
