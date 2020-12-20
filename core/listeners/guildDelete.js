const { Listener } = require('../structures')

class GuildDelete extends Listener {
  constructor (client) {
    super(client)
  }

  async eventGuildDelete (guild) {
    await this.client.database.guilds.remove(guild.id)
  }
}

module.exports = GuildDelete
