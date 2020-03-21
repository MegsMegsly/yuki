const randomPuppy = require('random-puppy');

module.exports = {
	name: 'dog',
	aliases: ['doug'],
	description: 'Random images of dogs',
	category: 'fun',
	enabled: true,
	execute(Yuki, message, args) {
		const subReddits = ['dog', 'pitbulls'];
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