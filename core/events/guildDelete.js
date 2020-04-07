const Guild = require('../database/schemas/Guild.js');

module.exports = (Yuki, guild) => {
	Guild.findOneAndDelete({ guildID: guild.id })
		.then(() => console.log(`Deleted server: [${guild.id}] - ${guild.name}`))
		.catch((error) => console.log(error.message))
};