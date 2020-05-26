const { inspect } = require('util');

module.exports = {
	name: 'eval',
	aliases: ['e', 'execute'],
	description: 'Evaluates JavaScript code represented as a string.',
	usage: '',
	category: 'developer',
	requirements: { devOnly: true },
	enabled: true,
	async execute(Yuki, message, args) {
		try {
			const expression = await eval(message.content.split(' ').slice(1).join(' '));
			const evaluated = inspect(expression, { depth: 0 });
			await message.channel.send(this.clean(evaluated), { code: 'js' });
		} catch (error) {
			message.channel.send(this.clean(error), { code: 'js' });
		}
	},

	clean(text) {
		const blankSpace = String.fromCharCode(8203);
		return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text;
	}
};