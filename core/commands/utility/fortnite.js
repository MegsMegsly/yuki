const Fortnite = require('fortnite');

const fortnite = new Fortnite(process.env.FORTNITEAPIKEY);

module.exports = {
	name: 'fortnite',
	aliases: ['fort'],
	description: 'Show Fortnite Profile',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		fortnite.user(args.join(" "), 'pc')
			.then((user) => {
				const embed = new Yuki.RichEmbed()
					.setThumbnail('https://pbs.twimg.com/profile_images/1052980485104656384/6mctrPUF.jpg')
					.setTitle(`${user.username} [${user.platform}]`)
					.addField('Solo Kills', `\`\`\`\n${user.stats.solo.kills}\n\`\`\``, true)
					.addField('Solo KD:', `\`\`\`\n${user.stats.solo.kd}\n\`\`\``, true)
					.addField('Solo Matches', `\`\`\`\n${user.stats.solo.matches}\n\`\`\``, true)
					.addField('Solo Wins:', `\`\`\`\n${user.stats.solo.wins}\n\`\`\``, true)
					.addField('Top 5:', `\`\`\`\n${user.stats.solo.top_5}\n\`\`\``, true)
					.addField('Top 25:', `\`\`\`\n${user.stats.solo.top_25}\n\`\`\``, true)
				message.channel.send(embed);
			})
			.catch((error) => {
				message.channel.send(error, { code: 'js' });
			})
	}
};