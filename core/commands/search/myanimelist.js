const mal = require('mal-scraper');

module.exports = {
	name: 'myanimelist',
	aliases: ['mal', 'anime'],
	description: 'Show the anime in detail!',
	category: 'utility',
	usage: '<anime name>',
	requirements: { arguments: true },
	enabled: true,
	execute(Yuki, message, args) {
		mal.getInfoFromName(args[0])
			.then((anime) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.default)
					.setThumbnail(anime.picture)
					.setURL(anime.url)
					.setTitle(`${anime.title}${anime.japaneseTitle ? ` (${anime.japaneseTitle})` : ''}`)
					.addFields(
						{ name: 'Score:', value: Yuki.util.sendCode(anime.score, { code: 'js' }), inline: true },
						{ name: 'Ranked:', value: Yuki.util.sendCode(anime.ranked, { code: 'js' }), inline: true },
						{ name: 'Synopsis:', value: Yuki.util.sendCode(anime.synopsis.split('\n\n')[0] || '-', { code: 'js' }), inline: false },
						{ name: 'Episodes:', value: Yuki.util.sendCode(anime.episodes, { code: 'js' }), inline: true },
						{ name: 'Duration:', value: Yuki.util.sendCode(anime.duration, { code: 'js' }), inline: true },
						{ name: 'Studios:', value: Yuki.util.sendCode(anime.studios || '-', { code: 'js' }), inline: true },
					)
				);
			})
			.catch((error) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				);
			});
	}
};