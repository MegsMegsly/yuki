const Guild = require('../database/schemas/Guild.js');

module.exports = (Yuki, guild) => {
	Guild.create({ guildID: guild.id, prefix: process.env.PREFIX })
		.then(() => console.log(`New server: [${guild.id}] - ${guild.name}`))
		.catch((error) => console.log(error.message))
};