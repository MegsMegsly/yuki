module.exports = {
	name: 'serverAvatar',
	aliases: ['guildicon', 'servericon', 'sicon', 'gicon'],
	description: 'Show server avatar',
	category: 'utility',
	usage: '',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.send(new Yuki.MessageEmbed()
			.setColor(Yuki.util.hexColor.default)
			.setTitle(message.guild.name)
			.setDescription(`:park: **[Icon URL](${message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 })})**`)
			.setImage(message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
		);
	}
};