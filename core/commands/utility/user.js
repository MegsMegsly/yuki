const moment = require('moment');

module.exports = {
	name: 'user',
	aliases: ['member'],
	description: 'Show user info!',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
		const status = {online: 'Online', idle: 'Idle', dnd: 'Do Not Disturb', offline: 'Offline'};
		Yuki.fetchUser(member)
			.then((user) => {
				const embed = new Yuki.RichEmbed()
					.setColor('#445F52')
					.setThumbnail(user.displayAvatarURL)
					.addField(':mag: Name:', Yuki.util.sendCode(user.tag, { code: 'fix' }), true)
					.addField(':id: ID:', Yuki.util.sendCode(user.id, { code: 'py' }), true)
					.addField(':black_small_square: Nickname:', Yuki.util.sendCode(member.nickname || 'None', { code: 'js' }), true)
					.addField('Status:', Yuki.util.sendCode(status[user.presence.status], { code: 'py' }), true)
					.addField(':desktop: Presence:', Yuki.util.sendCode(member.user.presence.game ? member.user.presence.game.name: 'Nothing', { code: 'py' }), true)
					.addField(':pushpin: Highest Role:', member.highestRole, true)
					.addField(':art: Roles:', Yuki.util.sendCode(member.roles.filter(r => r.name !== '@everyone').map(r =>  r.name).join(', ')), false)
					.setFooter(`Account created in: ${moment(user.createdAt).format('l')} - ${moment(user.createdAt).startOf('hour').fromNow()}`)
				message.channel.send(embed);
			})
			.catch((error) => {
				const embed = new Yuki.RichEmbed()
					.setColor(Yuki.util.hexColor.error)
					.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
				message.channel.send(embed).then(message.channel.stopTyping());
			});
	}
};