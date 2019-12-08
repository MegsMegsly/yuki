module.exports = {
	name: 'avatar',
	aliases: ['photo'],
	description: 'Show user avatar',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.startTyping();
		const target = message.mentions.users.first() || Yuki.users.get(args[0]) || message.author
		Yuki.fetchUser(target)
			.then((user) => {
				const embed = new Yuki.RichEmbed()
					.setTitle(user.tag)
					.setDescription(`:park: **[Avatar URL](${user.displayAvatarURL})**`)
					.setImage(user.displayAvatarURL);
				message.channel.send(embed);
			})
			.catch((error) => {
				const embed = new Yuki.RichEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				message.channel.send(embed).then(message.channel.stopTyping());
			});
	}
};