module.exports = {
	name: 'kick',
	description: 'This command allows you to kick a member',
	category: 'moderation',
	usage: '<@user>',
	requirements: { arguments: true },
	enabled: true,
	async execute(Yuki, message, args) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new Yuki.MessageEmbed()
			.setColor(Yuki.util.hexColor.warning)
			.setDescription('_You do not have sufficient **permissions** to run this command._')
		);
		if(!member.kickable) return message.channel.send(new Yuki.MessageEmbed()
			.setColor(Yuki.util.hexColor.warning)
			.setDescription('_I do not have enough **permissions** to run this command!_')
		);

		const reason = args.slice(1).join(' ');

		member.kick({ reason })
			.then((member) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(`${member.user.tag} was kicked.\nReason: ${reason ? reason : 'None'}`)
					.setFooter(`by: ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
				);
			})
			.catch((error) => {
				message.channel.send(new Yuki.MessageEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				);
			})
	}
};