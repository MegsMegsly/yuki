module.exports = {
	name: 'avatar',
	aliases: ['photo'],
	description: 'Show user avatar',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.send(message.author.displayAvatarURL);
	}
};