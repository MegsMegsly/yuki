const mal = require('mal-scraper');

module.exports = {
	name: 'myanimelist',
	aliases: ['mal'],
	description: 'Show the anime in detail!',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.startTyping();
		mal.getInfoFromName(args[0])
			.then((data) => {
				const embed = new Yuki.RichEmbed()
					.setColor('#445F52')
					.setThumbnail(data.picture)
					.setURL(data.url)
					.setTitle(`${data.title}${data.japaneseTitle ? ` (${data.japaneseTitle})` : ''}`)
					.addField('Score:', `\`\`\`\n${data.score}\n\`\`\``, true)
					.addField('Ranked:', `\`\`\`\n${data.ranked}\n\`\`\``, true)
					.addField('Synopsis:', `\`\`\`\n${data.synopsis.split('\n\n')[0]}\n\`\`\``, false)
					.addField('Episodes:', `\`\`\`\n${data.episodes}\n\`\`\``, true)
					.addField('Duration:', `\`\`\`\n${data.duration}\n\`\`\``, true)
					.addField('Studios:', `\`\`\`\n${data.studios}\n\`\`\``, true)
				message.channel.send(embed).then(message.channel.stopTyping());
			})
			.catch((error) => {
				message.channel.send(error, {code: 'js' }).then(message.channel.stopTyping());
			});
	}
};