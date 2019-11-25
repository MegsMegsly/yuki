module.exports = {
	name: 'eval',
	aliases: ['e'],
	description: 'Evaluates JavaScript code represented as a string.',
	category: 'owner',
	enabled: true,
	execute(Yuki, message, args) {
		if(message.author.id !== process.env.OWNERID) return console.log(`Usou o comando upload: ${message.author.tag}`);
		const expression = message.content.split(' ').slice(1).join(' ');
		try {
			message.channel.send(eval(expression), { code: 'js' });
		} catch (error) {
			message.channel.send(error, { code: 'js' });
		}
	}
};