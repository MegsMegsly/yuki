const answers = require('../../assets/json/answers.json');

module.exports = {
	name: '8ball',
	aliases: [''],
	description: 'Free offenses!',
	usage: '(question)',
	requirements: { arguments: true },
	category: 'fun',
	enabled: true,
	execute(Yuki, message, args) {
		message.channel.send(new Yuki.MessageEmbed()
			.setColor(Yuki.util.hexColor.default)
			.setDescription(`:8ball: --> ${Yuki.util.randomItem(answers)}`)
		);
	}
};