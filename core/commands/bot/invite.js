const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'invite',
  aliases: [],
  description: 'Invite link',
  usage: '',
  category: 'bot',
  enabled: true,
  async execute (message) {
    const invite = await message.client.generateInvite(['ADMINISTRATOR'])

    message.channel.send(new MessageEmbed()
      .setDescription(`(つ≧▽≦)つ This is my **[invite link!](${invite})**`)
    )
  }
}
