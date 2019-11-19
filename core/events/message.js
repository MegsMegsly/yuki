module.exports = (Yuki, message) => {
	if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(process.env.PREFIX)) return;
	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = Yuki.commands.get(commandName) || Yuki.commands.find((command) => command.aliases && command.aliases.includes(commandName));
	if (!command) return;
	if (!command.enabled) return;
	try {
		command.execute(Yuki, message, args);
	} catch (error) {
		console.log(error);
	}
};