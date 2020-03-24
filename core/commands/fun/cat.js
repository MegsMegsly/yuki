const randomPuppy = require('random-puppy');

module.exports = {
	name: 'cat',
	aliases: ['meow', 'cats'],
	description: 'Random images of cats',
	category: 'fun',
	enabled: true,
	execute(Yuki, message, args) {
		randomPuppy(Yuki.util.randomItem(['cat', 'CatTaps']))
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