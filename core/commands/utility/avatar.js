module.exports = {
	name: 'avatar',
	aliases: ['photo'],
	description: 'Show user and server avatar',
	category: 'utility',
	usage: '<@user|(server)>',
	enabled: true,
	execute(Yuki, message, args) {
		const target = message.mentions.users.first() || Yuki.users.cache.get(args[0]) || message.author;
		try {
			if (args[0] && args[0].toLowerCase() === 'server') {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.default)
					.setTitle(message.guild.name)
					.setDescription(`:park: **[Icon URL](${message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 })})**`)
					.setImage(message.guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
				);
			} else {
				Yuki.users.fetch(target.id)
					.then((user) => {
						message.channel.send(new Yuki.MessageEmbed()
							.setColor(Yuki.util.hexColor.default)
							.setTitle(user.tag)
							.setDescription(`:park: **[Avatar URL](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })})**`)
							.setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
						);
					})
			}
		} catch (error) {
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.error)
				.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
			);
		}
	}
};