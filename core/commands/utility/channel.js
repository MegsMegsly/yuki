const moment = require('moment');

module.exports = {
	name: 'channel',
	aliases: ['channel-info'],
	description: 'Responds with detailed information on a channel.',
	usage: '<#channel>',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const types = {
			dm: 'DM',
			group: 'Group DM',
			text: 'Text Channel',
			voice: 'Voice Channel',
			category: 'Category',
			unknown: 'Unknown'
		};
		const channel = message.guild.channels.cache.get(args[0]) || message.channel;

		message.channel.send(new Yuki.MessageEmbed()
			.setColor('#445F52')
			.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
			.addFields(
				{ name: ':mag: Name:', value: Yuki.util.sendCode(channel.name, { code: 'css' }), inline: true },
				{ name: ':id: ID:', value: Yuki.util.sendCode(channel.id, { code: 'py' }), inline: true },
				{ name: ':triangular_ruler: Category:', value: Yuki.util.sendCode(channel.parent ? channel.parent.name : 'None', { code: 'css' }), inline: true },
				{ name: ':pencil: Topic:', value: Yuki.util.sendCode(channel.topic || 'Nothing'), inline: false },
				{ name: ':books: Type:', value: Yuki.util.sendCode(types[channel.type], { code: 'py' }), inline: true },
				{ name: ':underage: NSFW:', value: Yuki.util.sendCode(channel.nsfw ? 'Yes' : 'No', { code: 'py' }), inline: true },
			)
			.setFooter(`Channel created in ${moment(channel.createdAt).format('l')} - ${moment(channel.createdAt).startOf('hour').fromNow()}`)
		);
	}
};