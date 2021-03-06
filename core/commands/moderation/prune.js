module.exports = {
  name: 'prune',
  aliases: ['clear', 'purge'],
  description: 'This command allows you to clear the chat',
  category: 'moderation',
  usage: '[amount]',
  requirements: { parameters: true, permissions: ['MANAGE_MESSAGES'] },
  async execute (message) {
    const count = parseInt(message.parameters[0])

    if (!count || count < 1 || count > 100) return message.channel.send('Enter a value between 1 and 100, so you can delete messages')

    await message.delete()
    message.channel.bulkDelete(count)
      .then((messages) => message.channel.send(`:wastebasket: : Deleted ${messages.size} messages!`).then((m) => m.delete({ timeout: 5000 })))
      .catch((error) => message.channel.send(`Error: ${error.message}`, { code: 'js' }))
  }
}
