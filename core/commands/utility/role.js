module.exports = {
	name: 'role',
	aliases: ['rl'],
	description: 'Shows all information for a given role',
	category: 'utility',
	usage: '<role @name|id>',
	requirements: { arguments: false },
	enabled: true,
	execute(Yuki, message, args) {
		const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.member.roles.hoist;
		const serialized = role.permissions.serialize();
		const permissions = Object.keys(serialized).filter(perm => serialized[perm]);

		message.channel.send(new Yuki.MessageEmbed()
			.setColor(role.hexColor)
			.setThumbnail(`https://dummyimage.com/512/${role.hexColor.slice(1)}/&text=%20`)
			.addFields([
				{ 
					name: ':mag: Name:',
					value: Yuki.util.sendCode(role.name, { code: 'js' }), 
					inline: true 
				},
				{ 
					name: ':id: ID:', 
					value: Yuki.util.sendCode(role.id, { code: 'js' }), 
					inline: true 
				},
				{ 
					name: ':art: Color:', 
					value: Yuki.util.sendCode(role.hexColor.toUpperCase(), { code: 'css' }), 
					inline: true 
				},
				{ 
					name: ':person_raising_hand: Mentionable:', 
					value: Yuki.util.sendCode(role.mentionable ? 'Yes' : 'No', { code: 'js' }), 
					inline: true 
				},
				{ 
					name: ':pushpin: Hoisted:', 
					value: Yuki.util.sendCode(role.hoist ? 'Yes' : 'No', { code: 'js' }), 
					inline: true 
				},
				{ 
					name: ':straight_ruler: Position:', 
					value: Yuki.util.sendCode(`${role.position}/${message.guild.roles.cache.size}`, { code: 'js' }), 
					inline: true 
				},
				{ 
					name: ':closed_lock_with_key: Permissions:', 
					value: Yuki.util.sendCode(permissions.join('\n') || 'None', { code: 'js' }), 
					inline: false 
				}
			])
			.setFooter(`Currently ${role.members.size} member(s) using this role`)
		);
	}
};