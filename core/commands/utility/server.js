const moment = require('moment');
const regions = require('../../assets/json/regions.json');
const verificationLevels = require('../../assets/json/verificationLevels.json');

module.exports = {
	name: 'server',
	aliases: ['sv', 'guild'],
	description: 'Show info server',
	usage: '',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const guild = Yuki.guilds.cache.get(args[0]) || message.guild;

		const categories = guild.channels.cache.filter(({ type }) => type === 'category').size;
		const textChannels = guild.channels.cache.filter(({ type }) => type === 'text').size;
		const voiceChannels = guild.channels.cache.filter(({ type }) => type === 'voice').size;

		const members = guild.members.cache.filter(({ user }) => !user.bot).size;
		const bots = guild.members.cache.filter(({ user }) => user.bot).size;
		const mfaLevels = ['None', 'Elevated'];

		message.channel.send(new Yuki.MessageEmbed()
			.setColor(Yuki.util.hexColor.default)
			.setThumbnail(guild.iconURL({ format: 'png', dynamic: true, size: 2048 }))
			.addFields([
				{ 
					name: ':mag: Name:', 
					value: Yuki.util.sendCode(guild.name, { code: 'fix' }), 
					inline: true 
				},
				{ 
					name: ':id: ID:', 
					value: Yuki.util.sendCode(guild.id, { code: 'js' }), 
					inline: true 
				},
				{ 
					name: `:busts_in_silhouette: Members [${guild.memberCount}]:`, 
					value: Yuki.util.sendCode(`Humans: ${members} / Bots: ${bots}`, { code: 'py' }), 
					inline: false 
				},
				{ 
					name: ':capital_abcd: Acronym:', 
					value: Yuki.util.sendCode(guild.nameAcronym), 
					inline: true 
				},
				{ 
					name: ':card_box: Explicit Filter:', 
					value: Yuki.util.sendCode(guild.explicitContentFilter, { code: 'py' }), 
					inline: true 
				},
				{ 
					name: `:hash: Channels [${textChannels + voiceChannels}]:`, 
					value: Yuki.util.sendCode(`Categories: ${categories} / Text: ${textChannels} / Voice: ${voiceChannels}`, { code: 'py' }), 
					inline: false 
				},
				{ 
					name: `:slight_smile: Emojis [${guild.emojis.cache.size}]:`, 
					value: Yuki.util.sendCode(`Static: ${guild.emojis.cache.filter(e => !e.animated).size} / Animated: ${guild.emojis.cache.filter(e => e.animated).size}`, { code: 'py' }), 
					inline: false 
				},
				{ 
					name: `${regions[guild.region].flag} Region:`, value: Yuki.util.sendCode(regions[guild.region].name, { code: 'py' }), 
					inline: true 
				},
				{ 
					name: ':art: Roles:', 
					value: Yuki.util.sendCode(guild.roles.cache.size, { code: 'py' }), 
					inline: true 
				},
				{ 
					name: ':crown: Owner:', 
					value: Yuki.util.sendCode(guild.owner.user.tag, { code: 'js' }), 
					inline: true 
				},
				{ 
					name: ':clock1: AFK Timeout:', 
					value: Yuki.util.sendCode(`${guild.afkTimeout} seconds`, { code: 'js' }), 
					inline: true 
				},
				{ 
					name: `${verificationLevels[guild.verificationLevel].padlock} Verification Levels:`, 
					value: Yuki.util.sendCode(verificationLevels[guild.verificationLevel].name, { code: 'js' }), 
					inline: true },
				{ 
					name: ':bar_chart: MFA Level:', 
					value: Yuki.util.sendCode(mfaLevels[guild.mfaLevel]), 
					inline: true 
				}
			])
			.setFooter(`Server created in: ${moment(guild.createdAt).format('l')} - ${moment(guild.createdAt).startOf('hour').fromNow()}`)
		);
	}
};