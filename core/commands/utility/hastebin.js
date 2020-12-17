const fetch = require('node-fetch')

const baseURL = 'https://hastebin.com'

module.exports = {
  name: 'hastebin',
  aliases: ['haste'],
  description: '',
  usage: '[message]',
  requirements: { parameters: true },
  category: 'utility',
  async execute (message) {
    try {
      const response = await fetch(`${baseURL}/documents`, {
        method: 'POST',
        body: message.parameters.join(' '),
        headers: { 'Content-Type': 'application/json' }
      }).then((response) => response.json())

      message.channel.send(`${baseURL}/${response.key}`)
    } catch (error) {
      message.channel.send(`Error: ${error.message}`, { code: 'js' })
    }
  }
}
