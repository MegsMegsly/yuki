module.exports = {
	name: 'role',
	aliases: ['rl'],
	description: 'Show emoji',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const role = message.mentions.roles.first() || message.guild.roles.get(args[0]);
		const serialized = role.serialize();
		const permissions = Object.keys(serialized).filter(perm => serialized[perm]);
		const embed = new Yuki.RichEmbed()
			.setColor(role.hexColor)
			.setThumbnail(`https://dummyimage.com/512/${role.hexColor.slice(1)}/&text=%20`)
			.addField(':mag: Name:', `\`\`\`\n${role.name}\n\`\`\``, true)
			.addField(':id: ID:', `\`\`\`\n${role.id}\n\`\`\``, true)
			.addField(':art: Color:', `\`\`\`\n${role.hexColor.toUpperCase()}\n\`\`\``, true)
			.addField(':person_raising_hand: Mentionable:', `\`\`\`\n${role.mentionable ? 'Yes' : 'No'}\n\`\`\``, true)
			.addField(':pushpin: Hoisted:', `\`\`\`\n${role.hoist ? 'Yes' : 'No'}\n\`\`\``, true)
			.addField(':straight_ruler: Position:', `\`\`\`\n${role.position}/${message.guild.roles.size}\n\`\`\``, true)
			.addField(':closed_lock_with_key: Permissions:', `\`\`\`\n${permissions.join('\n') || 'None'}\n\`\`\``)
			.setFooter(`現在、このポジションを使用している[${role.members.size}]人のメンバー。`);
		message.channel.send(embed);
	}
};