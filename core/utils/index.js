class Utils {
  static randomItem (items) {
    return items[Math.floor(Math.random() * items.length)]
  }

  static async Reddit (subreddit) {
    return await require('node-fetch')(`https://reddit.com/r/${subreddit}.json`).then((response) => response.json())
  }
}

Utils.DiscordUtils = require('./DiscordUtils.js')
Utils.FileUtils = require('./FileUtils.js')

module.exports = Utils
