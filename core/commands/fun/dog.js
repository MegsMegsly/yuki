const Reddit = require('../../util/Reddit.js');

module.exports = {
	name: 'dog',
	aliases: ['doug'],
	description: 'Random images of dogs',
	usage: '',
	category: 'fun',
	enabled: true,
	async execute(Yuki, message, args) {
		try {
			const reddit = await Reddit(Yuki.util.randomItem(['dog', 'pitbulls']))
			
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