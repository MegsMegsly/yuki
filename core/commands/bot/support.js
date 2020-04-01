module.exports = {
	name: 'support',
	aliases: ['issue'],
	description: 'Support link!',
	usage: '',
	category: 'bot',
	enabled: true,
	async execute(Yuki, message, args) {
	        message.channel.send(new Yuki.MessageEmbed()
	        	.setColor(Yuki.util.hexColor.default)
	        	.setDescription(`Report any bugs, questions or suggestions in the issues tab of our **[repository!](https://github.com/MegsMegsly/yuki/issues)**`)
	        );
	}
};