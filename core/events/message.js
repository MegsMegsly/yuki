const _ = require('lodash');

module.exports = (Yuki, message) => {
	if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(process.env.PREFIX)) return;
	const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = Yuki.commands.get(commandName) || Yuki.commands.find((command) => command.aliases && command.aliases.includes(commandName));

	if (!command) return;

	command.requirements = _.defaults(command.requirements, {
		acessDev: false,
		arguments: false
	});

	if (command.requirements.acessDev && message.author.id !== process.env.OWNERID) return;

	if (command.requirements.arguments && !args.length) {
       		return message.channel.send(new Yuki.MessageEmbed()
       			.setColor(Yuki.util.hexColor.warning)
       			.addField(':pencil: Usage:', Yuki.util.sendCode(`${process.env.PREFIX}${command.name} ${command.usage}`, { code: 'css' }))
       		);
	}

	if (!command.enabled) return;
	try {
		command.execute(Yuki, message, args);
	} catch (error) {
		console.log(error);
	}
};