module.exports = class DiscordUtils {
  static resolveUser (message, id) {
    const members = message.guild.members.cache

    if (message.mentions.members.size) {
      id = message.mentions.members.first().id
    } else if (!isNaN(message.parameters[0])) {
      if (members.get(message.parameters[0])) {
        id = members.get(message.parameters[0]).id
      } else {
        id = /^([0-9]){18}$/.test(message.parameters[0]) ? message.parameters[0] : message.member.id
      }
    } else if (isNaN(message.parameters.join(' '))) {
      const username = message.parameters.join(' ').toLowerCase()
      const member = members.filter(({ user }) => user.username.toLowerCase().startsWith(username)).first()

      id = member ? member.id : message.member.id
    } else {
      id = message.member.id
    }

    return id
  }
}
