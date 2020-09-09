const { Listener } = require('../structures')

class GuildCreate extends Listener {
  constructor (client) {
    super(client)
  }

  async eventGuildCreate (guild) {
    await this.client.database.guilds._add(guild)
  }
}

module.exports = GuildCreate
