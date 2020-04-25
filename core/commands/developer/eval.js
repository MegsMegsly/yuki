const { inspect } = require('util');

module.exports = {
	name: 'eval',
	aliases: ['e', 'execute'],
	description: 'Evaluates JavaScript code represented as a string.',
	usage: '',
	category: 'developer',
	requirements: { acessDev: true },
	enabled: true,
	async execute(Yuki, message, args) {
		const expression = await eval(message.content.split(' ').slice(1).join(' '));
		const evaluated = inspect(expression, { depth: 0 })
		try {
			message.channel.send(evaluated, { code: 'js' });
		} catch (error) {
			message.channel.send(error, { code: 'js' });
		}
	}
};