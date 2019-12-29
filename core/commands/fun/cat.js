const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	aliases: ['meow'],
	description: 'Random images of cats',
	category: 'fun',
	enabled: true,
	async execute(Yuki, message, args) {
		try {
			message.channel.startTyping();
			const data = await (await fetch('https://nekos.life/api/v2/img/meow')).json();
			const embed = new Yuki.RichEmbed()
				.setImage(data.url)
				.setFooter('🐾')
			message.channel.send(embed).then(message.channel.stopTyping());
		} catch (error) {
			const embed = new Yuki.RichEmbed()
				.setColor(Yuki.util.hexColor.error)
				.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
			message.channel.send(embed).then(message.channel.stopTyping());
		}
	}
};