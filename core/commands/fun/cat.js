const { RandomRedditPost } = require('../../structures/command')

module.exports = {
  name: 'cat',
  aliases: ['catto', 'kitty', 'kitten'],
  description: 'Random images of cats',
  usage: '',
  category: 'fun',
  async execute (message) {
    RandomRedditPost(message, this)
      .catch((error) => message.channel.send(error.message, { code: 'js' }))
  }
}
