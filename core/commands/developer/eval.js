module.exports = {
	name: 'eval',
	aliases: ['e', 'execute'],
	description: 'Evaluates JavaScript code represented as a string.',
	usage: '',
	category: 'developer',
	requirements: { acessDev: true },
	enabled: true,
	execute(Yuki, message, args) {
		const expression = message.content.split(' ').slice(1).join(' ');
		try {
			message.channel.send(eval(expression), { code: 'js' });
		} catch (error) {
			message.channel.send(error, { code: 'js' });
		}
	}
};