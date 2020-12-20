const { RandomRedditPost } = require('../../structures/command')

module.exports = {
  name: 'dog',
  aliases: ['doug', 'dogpics', 'randomdog'],
  description: 'Random images of dogs',
  usage: '',
  category: 'fun',
  async execute (message) {
    RandomRedditPost(message, this)
      .catch((error) => message.channel.send(`Error: ${error.message}`, { code: 'js' }))
  }
}
