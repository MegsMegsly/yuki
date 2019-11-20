const Shitgram = require('shitgram');

const shitgram = new Shitgram();

module.exports = {
	name: 'instagram',
	aliases: ['insta'],
	description: 'Show Instagram Profile',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		shitgram.user(args[0])
			.then((user) => {
				const embed = new Yuki.RichEmbed()
					.setColor('#445F52')
					.setFooter('Sponsored by shitgram')
					.setThumbnail(user.avatarURL)
					.addField('Username:', `\`\`\`\n${user.username}\n\`\`\``, true)
					.addField('ID:', `\`\`\`\n${user.id}\n\`\`\``, true)
					.addField('Full Name:', `\`\`\`\n${user.fullName}\n\`\`\``, true)
					.addField('Biography:', `\`\`\`\n${user.biography}\n\`\`\``, false)
					.addField('Posts:', `\`\`\`\n${user.posts}\n\`\`\``, true)
					.addField('Followers:', `\`\`\`\n${user.followers}\n\`\`\``, true)
					.addField('Following:', `\`\`\`\n${user.following}\n\`\`\``, true)
				message.channel.send(embed);
			})
			.catch((error) => {
				message.channel.send(error);
			});
	}
};