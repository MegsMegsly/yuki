const Catbox = require('catbox.moe');

const catbox = new Catbox(process.env.CATBOX_USERHASH);

module.exports = {
	name: 'catbox',
	aliases: ['cb'],
	description: 'Upload images to catbox',
	category: 'developer',
	enabled: true,
	execute(Yuki, message, args) {
		if(message.author.id !== process.env.OWNERID) return console.log(`Usou o comando ${this.name}: ${message.author.tag}`);

		message.channel.startTyping();
		if (args[0].toUpperCase() === 'UP') {
			catbox.upload(args[1])
				.then((url) => {
					const embed = new Yuki.RichEmbed()
						.setImage(url)
						.setDescription(`[Catbox URL](${url})`)
					message.channel.send(embed).then(message.channel.stopTyping());
				})
				.catch((error) => {
					message.channel.send(error, { code: 'js' }).then(message.channel.stopTyping());
				});
		} else if (args[0].toUpperCase() === 'DEL') {
			catbox.delete(args[1].split(','))
				.then((data) => {
					const embed = new Yuki.RichEmbed()
						.setDescription(data.join('\n'))
					message.channel.send(embed).then(message.channel.stopTyping());
				})
				.catch((error) => {
					message.channel.send(error, { code: 'js' }).then(message.channel.stopTyping());
				});
		}
	}
};