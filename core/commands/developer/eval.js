module.exports = {
	name: 'eval',
	aliases: ['e'],
	description: 'Evaluates JavaScript code represented as a string.',
	category: 'owner',
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