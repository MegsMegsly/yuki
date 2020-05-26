const Youtube = new (require('simple-youtube-api'))(process.env.YOUTUBE_API_KEY);

module.exports = {
	name: 'youtube',
	aliases: ['yt'],
	description: 'Search videos on YouTube and send video URL',
	category: 'search',
	usage: '(search)',
	requirements: { arguments: true },
	enabled: true,
	execute(Yuki, message, args) {
		Youtube.searchVideos(args.join(' '))
			.then((results) => message.channel.send(`:desktop: | https://www.youtube.com/watch?v=${results[0].id}`))
			.catch((error) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				);
			});
	}
};