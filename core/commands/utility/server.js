module.exports = {
	name: 'server',
	aliases: ['sv, guild'],
	description: 'Show info server',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const guild = Yuki.guilds.get(args[0]) || message.guild
		const embed = new Yuki.RichEmbed()
			.setColor('#445F52')
			.setThumbnail(guild.iconURL)
			.addField(':mag: Name:', Yuki.util.sendCode(guild.name, { code: 'fix' }), true)
			.addField(':id: ID:', Yuki.util.sendCode(guild.id, { code: 'js' }), true)
			.addField(':busts_in_silhouette: Members:', Yuki.util.sendCode(guild.memberCount, { code: 'py' }), true)
			.addField(':hash: Channels:', Yuki.util.sendCode(guild.channels.size, { code: 'py' }), true)
			.addField(':straight_ruler: Roles:', Yuki.util.sendCode(guild.roles.size, { code: 'py' }), true)
			.addField(':slight_smile: Emojis:', Yuki.util.sendCode(guild.emojis.size, { code: 'py' }), true)
		message.channel.send(embed);
	}
};