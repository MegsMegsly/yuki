const { Reddit, randomItem } = require('../../utils')
const { MessageEmbed } = require('discord.js')

const subreddits = require('../../assets/json/subreddits.json')

module.exports = class Command {
  static async RandomRedditPost (message, { name }) {
    const post = await Reddit(randomItem(subreddits[name]))

    message.channel.send(new MessageEmbed()
      .setImage(randomItem(post.data.children).data.url)
    )
  }
}
