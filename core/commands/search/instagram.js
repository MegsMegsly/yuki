const Shitgram = require('shitgram');

const shitgram = new Shitgram();

module.exports = {
	name: 'instagram',
	aliases: ['insta', 'ig'],
	description: 'Show Instagram Profile',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.startTyping();
		shitgram.user(args[0])
			.then((user) => {
				const embed = new Yuki.RichEmbed()
					.setColor('#445F52')
					.setThumbnail(user.avatarURL)
					.addField('Username:', Yuki.util.sendCode(user.username, { code: 'js' }), true)
					.addField('ID:', Yuki.util.sendCode(user.id, { code: 'js' }), true)
					.addField('Full Name:', Yuki.util.sendCode(user.fullName || '-', { code: 'js' }), true)
					.addField('Biography:', Yuki.util.sendCode(user.biography || '-', { code: 'js' }), false)
					.addField('Posts:', Yuki.util.sendCode(user.posts, { code: 'js' }), true)
					.addField('Followers:', Yuki.util.sendCode(user.followers, { code: 'js' }), true)
					.addField('Following:', Yuki.util.sendCode(user.following, { code: 'js' }), true)
					.setFooter('Sponsored by Shitgram', 'https://files.catbox.moe/fgb31w.png')
				message.channel.send(embed).then(message.channel.stopTyping());
			})
			.catch((error) => {
				const embed = new Yuki.RichEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				message.channel.send(embed).then(message.channel.stopTyping());
			});
	}
};