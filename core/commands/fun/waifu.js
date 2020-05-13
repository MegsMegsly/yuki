const Neko = new (require('nekos.life'))();

module.exports = {
	name: 'waifu',
	aliases: ['mywaifu'],
	description: 'Random images of waifus',
	usage: '',
	category: 'fun',
	enabled: true,
	execute(Yuki, message, args) {
		Neko.sfw.waifu()
			.then((image) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.default)
					.setImage(image.url)
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