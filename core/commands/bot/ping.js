module.exports = {
  name: 'ping',
  aliases: ['pong', 'latency'],
  description: 'Gets the bot latency',
  usage: '',
  category: 'bot',
  async execute (message) {
    const msg = await message.channel.send('🏓 *Pinging...*')
    const ping = msg.createdTimestamp - message.createdTimestamp

    msg.edit(`*🏓 Ping: ${ping}ms*`)
  }
}
