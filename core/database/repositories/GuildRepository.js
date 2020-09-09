const MongoRepository = require('../MongoRepository.js')
const GuildSchema = require('../schemas/GuildSchema.js')

class GuildRepository extends MongoRepository {
  constructor () {
    super(GuildSchema)
  }

  _add (guild) {
    return this.add({
      _id: guild.id,
      prefix: process.env.YUKI_PREFIX
    })
  }
}

module.exports = GuildRepository
