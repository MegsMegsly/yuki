const moment = require('moment');

module.exports = {
	name: 'server',
	aliases: ['sv, guild'],
	description: 'Show info server',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const regions = {
			brazil: {
				name: 'Brazil',
				flag: ':flag_br:'
			},
			europe: {
				name: 'Europe',
				flag: ':flag_eu:'
			},
			hongkong: {
				name: 'Hong Kong',
				flag: ':flag_hk:'
			},
			india: {
				name: 'India',
				flag: ':flag_in:'
			},
			japan: {
				name: 'Japan',
				flag: ':flag_jp:'
			},
			russia: {
				name: 'Russia',
				flag: ':flag_ru:'
			},
			singapore: {
				name: 'Singapore',
				flag: ':flag_sg:'
			},
			southafrica: {
				name: 'South Africa',
				flag: ':flag_za:'
			},
			sydney: {
				name: 'Sydney',
				flag: ':flag_au:'
			},
			'us-central': {
				name: 'US Central',
				flag: ':flag_us:'
			},
			'us-east': {
				name: 'US East',
				flag: ':flag_us:'
			},
			'us-south': {
				name: 'US South',
				flag: ':flag_us:'
			},
			'us-west': {
				name: 'US West',
				flag: ':flag_us:'
			}
		};

		const guild = Yuki.guilds.get(args[0]) || message.guild;

		const categories = guild.channels.filter(({ type }) => type === 'category').size;
		const textChannels = guild.channels.filter(({ type }) => type === 'text').size;
		const voiceChannels = guild.channels.filter(({ type }) => type === 'voice').size;

		const members = guild.members.filter(({ user }) => !user.bot).size;
		const bots = guild.members.filter(({ user }) => user.bot).size;

		const embed = new Yuki.RichEmbed()
			.setColor('#445F52')
			.setThumbnail(guild.iconURL)
			.addField(':mag: Name:', Yuki.util.sendCode(guild.name, { code: 'fix' }), true)
			.addField(':id: ID:', Yuki.util.sendCode(guild.id, { code: 'js' }), true)
			.addField(`:hash: Channels [${textChannels + voiceChannels}]:`, Yuki.util.sendCode(`Categories: ${categories} / Text: ${textChannels} / Voice: ${voiceChannels}`, { code: 'py' }), false)
			.addField(`:busts_in_silhouette: Members [${guild.memberCount}]:`, Yuki.util.sendCode(`Humans: ${members} / Bots: ${bots}`, { code: 'py' }), false)
			.addField(`${regions[guild.region].flag} Region:`, Yuki.util.sendCode(regions[guild.region].name, { code: 'py' }), true)
			.addField(':art: Roles:', Yuki.util.sendCode(guild.roles.size, { code: 'py' }), true)
			.addField(':slight_smile: Emojis:', Yuki.util.sendCode(guild.emojis.size, { code: 'py' }), true)
			.addField(':crown: Owner:', Yuki.util.sendCode(guild.owner.user.tag, { code: 'js' }), true)
			.setFooter(`Server created in: ${moment(guild.createdAt).format('l')} - ${moment(guild.createdAt).startOf('hour').fromNow()}`)
		message.channel.send(embed);
	}
};