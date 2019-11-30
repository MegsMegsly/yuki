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
					.addField('Score:', Yuki.util.sendCode(`${data.score}`, { code: 'js' }), true)
					.addField('Ranked:', Yuki.util.sendCode(`${data.ranked}`, { code: 'js' }), true)
					.addField('Synopsis:', Yuki.util.sendCode(`${data.synopsis.split('\n\n')[0]}`, { code: 'js' }), false)
					.addField('Episodes:', Yuki.util.sendCode(`${data.episodes}`, { code: 'js' }), true)
					.addField('Duration:', Yuki.util.sendCode(`${data.duration}`, { code: 'js' }), true)
					.addField('Studios:', Yuki.util.sendCode(`${data.studios}`, { code: 'js' }), true)
				message.channel.send(embed).then(message.channel.stopTyping());
			})
			.catch((error) => {
				message.channel.send(error, {code: 'js' }).then(message.channel.stopTyping());
			});
	}
};