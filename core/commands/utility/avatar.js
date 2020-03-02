module.exports = {
	name: 'avatar',
	aliases: ['photo'],
	description: 'Show user avatar',
	category: 'utility',
	usage: '<@user>',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.startTyping();
		const target = message.mentions.users.first() || Yuki.users.get(args[0]) || message.author
		Yuki.fetchUser(target)
			.then((user) => {
				message.channel.send(new Yuki.RichEmbed()
					.setColor(Yuki.util.hexColor.default)
					.setTitle(user.tag)
					.setDescription(`:park: **[Avatar URL](${user.displayAvatarURL})**`)
					.setImage(user.displayAvatarURL)
				);
			})
			.catch((error) => {
				message.channel.send(new Yuki.RichEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				);
			});
	}
};