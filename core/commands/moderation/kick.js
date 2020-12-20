const { DiscordUtils } = require('../../utils')

module.exports = {
  name: 'kick',
  aliases: [],
  description: 'This command allows you to kick a member',
  category: 'moderation',
  usage: '[@user] <reason>',
  requirements: { parameters: true, permissions: ['KICK_MEMBERS'] },
  async execute (message) {
    try {
      const member = await message.guild.members.fetch(DiscordUtils.resolveUser(message))
      const reason = message.parameters.slice(1).join(' ')

      const _message = await message.channel.send(`Are you sure you want to kick ${member.user.tag}?`)

      await _message.react('✅')
      await _message.react('❌')

      const collector = _message.createReactionCollector((reaction, user) => user.id === message.author.id, { max: 1, time: 60 * 1E3 })

      collector.on('collect', async (reaction) => {
        if (reaction.emoji.name === '✅') {
          const _member = await member.kick({ reason })

          _message.edit(`${_member.user.tag} was kicked.\nReason: ${reason}`)
          _message.reactions.removeAll()
        }
        if (reaction.emoji.name === '❌') {
          _message.edit(`${member.user.tag} was not kicked.`).then((_message) => _message.delete(5000))
          _message.reactions.removeAll()
        }
      })

      await collector.on('end', () => {
        if (collector.total !== 1) {
          _message.edit('Command time has expired')
          _message.reactions.removeAll()
        }
      })
    } catch (error) {
      message.channel.send(`Error: ${error.message}`, { code: 'js' })
    }
  }
}
