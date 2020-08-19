const Reddit = require('../../util/Reddit.js');

module.exports = {
	name: 'cat',
	aliases: ['meow', 'cats'],
	description: 'Random images of cats',
	usage: '',
	category: 'fun',
	enabled: true,
	async execute(Yuki, message, args) {
		try {
			const reddit = await Reddit(Yuki.util.randomItem(['cat', 'CatTaps', 'catpictures']))

			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.setImage(Yuki.util.randomItem(reddit.data.children).data.url)
			);
		} catch (error) {
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.error)
				.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
			);
		}
	}
};