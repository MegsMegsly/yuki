const _ = require('lodash');
const Guild = require('../database/schemas/Guild.js');

module.exports = async (Yuki, message) => {
	const { prefix } = await Guild.findOne({ guildID: message.guild.id });

	if (message.author.bot || message.channel.type === 'dm' || !message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = Yuki.commands.get(commandName) || Yuki.commands.find((command) => command.aliases && command.aliases.includes(commandName));

	if (!command) return;

	command.requirements = _.defaults(command.requirements, {
		devOnly: false,
		arguments: false,
		permissions: []
	});

	if (command.requirements.devOnly && message.author.id !== process.env.OWNERID) return;

	if (command.requirements.arguments && !args.length) {
		return message.channel.send(new Yuki.MessageEmbed()
		       	.setColor(Yuki.util.hexColor.warning)
		       	.addField(':pencil: Usage:', Yuki.util.sendCode(`${prefix}${command.name} ${command.usage}`, { code: 'css' }))
		);
	}

	if (command.requirements.permissions.length) {
		const requiredPermissions = _.difference(command.requirements.permissions, message.member.permissions.toArray())

		if (requiredPermissions.length) {
			return message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.warning)
				.setDescription('You must have sufficient permissions to execute this command!')
			);
		}
	}

	if (!command.enabled) return;

	try {
		command.execute(Yuki, message, args);
	} catch (error) {
		console.log(error);
	}
};