module.exports = {
  name: 'youtube',
  aliases: ['yt'],
  description: 'Search for a video on YouTube',
  usage: '[search]',
  requirements: { parameters: true },
  category: 'fun',
  async execute (message) {
    try {
      const { id: { videoId } } = await message.client.apis.youtube.searchVideos(message.parameters.join(' ')).then((response) => response.items[0])

      message.channel.send(`🖥️ | https://youtu.be/${videoId}`)
    } catch (error) {
      message.channel.send(`Error: ${error.message}`, { code: 'js' })
    }
  }
}
