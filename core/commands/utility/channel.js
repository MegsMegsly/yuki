const moment = require('moment');

module.exports = {
	name: 'channel',
	aliases: ['channel-info'],
	description: 'Responds with detailed information on a channel.',
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
		const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]) || message.channel;

		message.channel.send(new Yuki.RichEmbed()
			.setColor('#445F52')
			.setThumbnail(message.guild.iconURL)
			.addField(':mag: Name:', Yuki.util.sendCode(channel.name, { code: 'css' }), true)
			.addField(':id: ID:', Yuki.util.sendCode(channel.id, { code: 'py' }), true)
			.addField(':triangular_ruler: Category:', Yuki.util.sendCode(channel.parent ? channel.parent.name : 'None', { code: 'css' }), true)
			.addField(':pencil: Topic:', Yuki.util.sendCode(channel.topic || 'Nothing'), false)
			.addField(':books: Type:', Yuki.util.sendCode(types[channel.type], { code: 'py' }), true)
			.addField(':underage: NSFW:', Yuki.util.sendCode(channel.nsfw ? 'Yes' : 'No', { code: 'py' }), true)
			.setFooter(`Channel created in ${moment(channel.createdAt).format('l')} - ${moment(channel.createdAt).startOf('hour').fromNow()}`)
		);
	}
};