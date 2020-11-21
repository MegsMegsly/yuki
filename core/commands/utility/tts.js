const googleTTS = require('google-tts-api')
const { MessageAttachment } = require('discord.js')

module.exports = {
  name: 'tts',
  aliases: [],
  description: '',
  usage: '',
  category: 'utility',
  async execute (message) {
    try {
      const tts = await googleTTS(message.parameters.join(' '), 'en', 0.24)

      message.channel.send(new MessageAttachment(tts, 'tts.mp3'))
    } catch (error) {
      message.channel.send(error.message, { code: 'js' })
    }
  }
}
