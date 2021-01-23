const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'avatar',
  aliases: ['photo'],
  description: '',
  usage: '<@user>',
  category: 'utility',
  async execute (message) {
    const target = await message.client.users.fetch(DiscordUtils.resolveUser(message))

    if (message.parameters[0]?.toLowerCase() === 'server') {
      message.channel.send(new MessageEmbed()
        .setTitle(message.guild.name)
        .setDescription(`🏞️ **[Icon URL](${message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 })})**`)
        .setImage(member.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
      )
    } else {
      message.guild.members.fetch(target.id)
      .then((member) => message.channel.send(new MessageEmbed()
        .setTitle(member.user.tag)
        .setDescription(`🏞️ **[Icon URL](${message.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })})**`)
        .setImage(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
      ))
      .catch((error) => message.channel.send(`Error: ${error.message}`, { code: 'js' }))
    }
  }
}
