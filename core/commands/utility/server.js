const moment = require('moment');
const regions = require('../../assets/json/regions.json');
const verificationLevels = require('../../assets/json/verificationLevels.json');

module.exports = {
	name: 'server',
	aliases: ['sv, guild'],
	description: 'Show info server',
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
			.addField(':mag: Name:', Yuki.util.sendCode(guild.name, { code: 'fix' }), true)
			.addField(':id: ID:', Yuki.util.sendCode(guild.id, { code: 'js' }), true)
			.addField(`:busts_in_silhouette: Members [${guild.memberCount}]:`, Yuki.util.sendCode(`Humans: ${members} / Bots: ${bots}`, { code: 'py' }), false)
			.addField(':capital_abcd: Acronym:', Yuki.util.sendCode(guild.nameAcronym), true)
			.addField(':card_box: Explicit Filter:', Yuki.util.sendCode(guild.explicitContentFilter, { code: 'py' }), true)
			.addField(`:hash: Channels [${textChannels + voiceChannels}]:`, Yuki.util.sendCode(`Categories: ${categories} / Text: ${textChannels} / Voice: ${voiceChannels}`, { code: 'py' }), false)
			.addField(`:slight_smile: Emojis [${guild.emojis.cache.size}]:`, Yuki.util.sendCode(`Static: ${guild.emojis.cache.filter(e => !e.animated).size} / Animated: ${guild.emojis.cache.filter(e => e.animated).size}`, { code: 'py' }), false)
			.addField(`${regions[guild.region].flag} Region:`, Yuki.util.sendCode(regions[guild.region].name, { code: 'py' }), true)
			.addField(':art: Roles:', Yuki.util.sendCode(guild.roles.cache.size, { code: 'py' }), true)
			.addField(':crown: Owner:', Yuki.util.sendCode(guild.owner.user.tag, { code: 'js' }), true)
			.addField(':clock1: AFK Timeout:', Yuki.util.sendCode(`${guild.afkTimeout} seconds`, { code: 'js' }), true)
			.addField(`${verificationLevels[guild.verificationLevel].padlock} Verification Levels:`, Yuki.util.sendCode(verificationLevels[guild.verificationLevel].name, { code: 'js' }), true)
			.addField(':bar_chart: MFA Level:', Yuki.util.sendCode(mfaLevels[guild.mfaLevel]), true)
			.setFooter(`Server created in: ${moment(guild.createdAt).format('l')} - ${moment(guild.createdAt).startOf('hour').fromNow()}`)
		);
	}
};