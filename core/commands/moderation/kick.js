module.exports = {
	name: 'kick',
	aliases: [''],
	description: 'This command allows you to kick a member',
	category: 'moderation',
	usage: '(@user) <reason>',
	requirements: { arguments: true, permissions: ['KICK_MEMBERS'] },
	enabled: true,
	async execute(Yuki, message, args) {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
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