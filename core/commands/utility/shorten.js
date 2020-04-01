const isgd = require('isgd');

module.exports = {
	name: 'shorten',
	aliases: [''],
	description: '',
	category: 'utility',
	usage: '<link url>',
	requirements: { arguments: true },
	enabled: true,
	execute(Yuki, message, args) {
		isgd.shorten(args[0], (res) => {
			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.setDescription(`:information_source: | ${res}`)
			);
		});
	}
};