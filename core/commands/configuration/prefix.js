const Guild = require('../../database/schemas/Guild.js');

module.exports = {
	name: 'prefix',
	aliases: ['setprefix', 'newprefix'],
	description: 'Server prefix manager',
	category: 'configuration',
	usage: '<new prefix|(reset)>',
	requirements: { permissions: ['MANAGE_GUILD'] },
	enabled: true,
	async execute(Yuki, message, args) {
		if (!args[0]) {
			const guild = await Guild.findOne({ guildID: message.guild.id })
			if (guild && guild.prefix) {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.default)
					.setDescription(Yuki.util.sendCode(`Current prefix: ${guild.prefix}`, { code: 'css' }))
				);
			}
		} else if (args[0] && args[0].toLowerCase() === 'reset') {
			await Guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { prefix: process.env.PREFIX } });
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.error)
				.setDescription(Yuki.util.sendCode('Reseted prefix!', { code: 'css' }))
			);
		} else {
			await Guild.findOneAndUpdate({ guildID: message.guild.id }, { $set: { prefix: args[0] } });
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.success)
				.setDescription(Yuki.util.sendCode(`New prefix: ${args[0]}`, { code: 'css' }))
			);
		}
	}
};