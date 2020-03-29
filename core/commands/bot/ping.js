module.exports = {
	name: 'ping',
	aliases: ['pong', 'latency'],
	description: 'Gets the bot latency!',
	usage: '',
	category: 'bot',
	enabled: true,
	async execute(Yuki, message, args) {
		const msg = await message.channel.send(':ping_pong: *Pinging...*');
		const ping = msg.createdTimestamp - message.createdTimestamp;

		msg.edit(`*:ping_pong: Ping: ${ping}ms*`);
	}
};