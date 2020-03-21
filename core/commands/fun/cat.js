const randomPuppy = require('random-puppy');

module.exports = {
	name: 'cat',
	aliases: ['meow', 'cats'],
	description: 'Random images of cats',
	category: 'fun',
	enabled: true,
	execute(Yuki, message, args) {
		const subReddits = ['cat', 'CatTaps'];
		const randomSubReddits = subReddits[Math.floor(Math.random() * subReddits.length)];

		randomPuppy(randomSubReddits)
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