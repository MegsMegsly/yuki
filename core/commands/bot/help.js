module.exports = {
	name: 'help',
	aliases: [],
	description: 'Shows all commands or a specific command',
	usage: '<command>',
	category: 'bot',
	enabled: true,
	async execute(Yuki, message, args) {
		const [commandName] = args;
		const findCommandByAlias = Yuki.commands.find((command) => command.aliases && command.aliases.includes(commandName))

		if (commandName && (Yuki.commands.has(commandName) || findCommandByAlias)) {
			const {
				name,
				usage
			} = Yuki.commands.get(commandName) || findCommandByAlias;

			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.addField(':pencil: Usage:', Yuki.util.sendCode(`${process.env.PREFIX}${name} ${usage}`, { code: 'css' }))
			);
		} else {
			const commands = (category) => Yuki.commands.filter((command) => command.category === category.toLowerCase()).map((command) => command.name);

			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.addField('Bot', `\`${commands('bot').join('\` \`')}\``)
				.addField('Fun', `\`${commands('fun').join('\` \`')}\``)
				.addField('Image Manipulation', `\`${commands('image-manipulation').join('\` \`')}\``)
				.addField('Moderation', `\`${commands('moderation').join('\` \`')}\``)
				.addField('Search', `\`${commands('search').join('\` \`')}\``)
				.addField('Utility', `\`${commands('utility').join('\` \`')}\``)
			);
		}
	}
};