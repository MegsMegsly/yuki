const randomPuppy = require('random-puppy');

module.exports = {
	name: 'dog',
	aliases: ['doug'],
	description: 'Random images of dogs',
	category: 'fun',
	enabled: true,
	execute(Yuki, message, args) {
		randomPuppy(this.name)
			.then((url) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.default)
					.setImage(url)
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