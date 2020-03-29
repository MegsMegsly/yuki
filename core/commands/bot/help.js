module.exports = {
	name: 'help',
	aliases: ['h'],
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
				aliases,
				usage
			} = Yuki.commands.get(commandName) || findCommandByAlias;

			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.addField(':pencil: Usage:', Yuki.util.sendCode(`${process.env.PREFIX}${name} ${usage}`, { code: 'css' }))
				.setFooter(`Aliases: [${process.env.PREFIX}${aliases}]`)
			);
		} else {
			const commands = (category) => Yuki.commands.filter((command) => command.category === category.toLowerCase()).map((command) => command.name);

			message.channel.send(new Yuki.MessageEmbed()
				.setColor(Yuki.util.hexColor.default)
				.addFields([
					{
						name: ':robot: Bot:',
						value: `\`${commands('bot').join('\` \`')}\``
					},
					{
						name: ':zany_face: Fun:',
						value: `\`${commands('fun').join('\` \`')}\``
					},
					{
						name: ':frame_photo: Image Manipulation:',
						value: `\`${commands('image-manipulation').join('\` \`')}\``
					},
					{
						name: ':scales: Moderation:',
						value: `\`${commands('moderation').join('\` \`')}\``
					},
					{
						name: ':mag: Search:',
						value: `\`${commands('search').join('\` \`')}\``
					},
					{
						name: ':tools: Utility:',
						value: `\`${commands('utility').join('\` \`')}\``
					}
				])
			);
		}
	}
};