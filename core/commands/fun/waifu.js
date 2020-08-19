const WaifuPics = require('waifu.pics')

module.exports = {
	name: 'waifu',
	aliases: ['mywaifu'],
	description: 'Random images of waifus',
	usage: '',
	category: 'fun',
	enabled: true,
	async execute(Yuki, message, args) {
		try {
                	const waifu = await WaifuPics.sfw()

			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.setImage(waifu.url)
			);
		} catch (error) {
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.error)
				.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
			);
		}
	}
};