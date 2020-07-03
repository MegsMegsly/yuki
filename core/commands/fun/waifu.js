const fetch = require('node-fetch')

module.exports = {
	name: 'waifu',
	aliases: ['mywaifu'],
	description: 'Random images of waifus',
	usage: '',
	category: 'fun',
	enabled: true,
	async execute(Yuki, message, args) {
		try {
			const response = await fetch('https://waifu.pics/api/sfw').then(res => res.json());
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.setImage(response.url)
			);
		} catch (error) {
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.error)
				.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
			);
		}
	}
};