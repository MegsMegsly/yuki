const { ShardingManager } = require('discord.js')

class Sharding extends ShardingManager {
  constructor (options = {}) {
    super('core/Yuki.js', options)

    this.on('shardCreate', (shard) => console.log(`Launching shard ${shard.id}`))
  }
}

module.exports = Sharding
