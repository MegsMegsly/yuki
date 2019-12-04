const Fortnite = require('fortnite');

const fortnite = new Fortnite(process.env.FORTNITEAPIKEY);

module.exports = {
	name: 'fortnite',
	aliases: ['fort'],
	description: 'Show Fortnite Profile',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.startTyping();
		fortnite.user(args.join(" "), 'pc')
			.then((user) => {
				const embed = new Yuki.RichEmbed()
					.setThumbnail('https://pbs.twimg.com/profile_images/1052980485104656384/6mctrPUF.jpg')
					.setTitle(`${user.username} [${user.platform}]`)
					.addField('Solo Kills', Yuki.util.sendCode(user.stats.solo.kills, { code: 'js' }), true)
					.addField('Solo KD:', Yuki.util.sendCode(user.stats.solo.kd, { code: 'js' }), true)
					.addField('Solo Matches', Yuki.util.sendCode(user.stats.solo.matches, { code: 'js' }), true)
					.addField('Solo Wins:', Yuki.util.sendCode(user.stats.solo.wins, { code: 'js' }), true)
					.addField('Top 5:', Yuki.util.sendCode(user.stats.solo.top_5, { code: 'js' }), true)
					.addField('Top 25:', Yuki.util.sendCode(user.stats.solo.top_25, { code: 'js' }), true)
				message.channel.send(embed).then(message.channel.stopTyping());
			})
			.catch((error) => {
				const embed = new Yuki.RichEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				message.channel.send(embed).then(message.channel.stopTyping());
			})
	}
};