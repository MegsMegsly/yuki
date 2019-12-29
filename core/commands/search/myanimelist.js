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
			.then((anime) => {
				const embed = new Yuki.RichEmbed()
					.setColor('#445F52')
					.setThumbnail(anime.picture)
					.setURL(anime.url)
					.setTitle(`${anime.title}${anime.japaneseTitle ? ` (${anime.japaneseTitle})` : ''}`)
					.addField('Score:', Yuki.util.sendCode(anime.score, { code: 'js' }), true)
					.addField('Ranked:', Yuki.util.sendCode(anime.ranked, { code: 'js' }), true)
					.addField('Synopsis:', Yuki.util.sendCode(anime.synopsis.split('\n\n')[0] || '-', { code: 'js' }), false)
					.addField('Episodes:', Yuki.util.sendCode(anime.episodes, { code: 'js' }), true)
					.addField('Duration:', Yuki.util.sendCode(anime.duration, { code: 'js' }), true)
					.addField('Studios:', Yuki.util.sendCode(anime.studios || '-', { code: 'js' }), true)
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