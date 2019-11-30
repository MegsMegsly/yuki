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
			.addField(':mag: Name:', Yuki.util.sendCode(`${role.name}`, { code: 'js' }), true)
			.addField(':id: ID:', Yuki.util.sendCode(`${role.id}`, { code: 'js' }), true)
			.addField(':art: Color:', Yuki.util.sendCode(`${role.hexColor.toUpperCase()}`, { code: 'js' }), true)
			.addField(':person_raising_hand: Mentionable:', Yuki.util.sendCode(`${role.mentionable ? 'Yes' : 'No'}`, { code: 'js' }), true)
			.addField(':pushpin: Hoisted:', Yuki.util.sendCode(`${role.hoist ? 'Yes' : 'No'}`, { code: 'js' }), true)
			.addField(':straight_ruler: Position:', Yuki.util.sendCode(`${role.position}/${message.guild.roles.size}`, { code: 'js' }), true)
			.addField(':closed_lock_with_key: Permissions:', Yuki.util.sendCode(`${permissions.join('\n') || 'None'}`, { code: 'js' }))
			.setFooter(`現在、このポジションを使用している[${role.members.size}]人のメンバー。`);
		message.channel.send(embed);
	}
};