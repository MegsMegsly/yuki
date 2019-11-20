module.exports = {
	name: 'role',
	aliases: ['r'],
	description: 'Show emoji',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
		const guild = Yuki.guilds.get(args[0]) || message.guild
		const permsObj = role.serialize();
        const permissions = Object.keys(permsObj).filter(perm => permsObj[perm]);
		const embed = new Yuki.RichEmbed()
			.setColor(role.hexColor)
			.setFooter(`現在、このポジションを使用している[${role.members.size}]人のメンバー。`)
			.setThumbnail(`https://dummyimage.com/512/${role.hexColor.slice(1)}/&text=%20`)
			.addField(':mag: Name:', `${"\n```" + role.name + "```\n"}`, true)
			.addField(':id: ID:', `${"\n```" + role.id + "```\n"}`, true)
			.addField(':art: Color:', `${"\n```" + role.hexColor.toUpperCase() + "```\n"}`, true)
	        .addField(':person_raising_hand: Mentionable:', `${"\n```" + `${role.mentionable ? 'Yes' : 'No'}` + "```\n"}`, true)
            .addField(':pushpin: Hoisted:', `${"\n```" + `${role.hoist ? 'Yes' : 'No'}` + "```\n"}`, true)
            .addField(':straight_ruler: Position:', `${"\n```" + `${role.position}/${guild.roles.size}` + "```\n"}`, true)
			.addField(':closed_lock_with_key: Permissions:', `${"\n```" + `${permissions.join(' \n ') || 'None'}` + "```\n"}`)
		message.channel.send(embed);
	}
};