const moment = require('moment');

module.exports = {
	name: 'server',
	aliases: ['sv, guild'],
	description: 'Show info server',
	category: 'utility',
	enabled: true,
	execute(Yuki, message, args) {
		const region = {
			brazil: 'Brazil', 
			europe: 'Europe', 
			hongkong: 'Hong Kong', 
			india: 'India',
			japan: 'Japan',
			russia: 'Russia',
			singapore: 'Singapore',
			southafrica: 'South Africa',
			sydney: 'Sydney'
		};

		const flags = {
			brazil: ':flag_br:',
			europe: ':flag_eu:', 
			hongkong: ':flag_hk:', 
			india: ':flag_in:',
			japan: ':flag_jp:',
			russia: ':flag_ru:',
			singapore: ':flag_sg:',
			southafrica: ':flag_za:',
			sydney: ':flag_au:'
		};

		const guild = Yuki.guilds.get(args[0]) || message.guild
		const Categories = guild.channels.filter(c => c.type === 'category').size;
		const textChannel = guild.channels.filter(channel => channel.type === 'text').size;
		const voiceChannel = guild.channels.filter(channel => channel.type === 'voice').size;
		const embed = new Yuki.RichEmbed()
			.setColor('#445F52')
			.setThumbnail(guild.iconURL)
			.addField(':mag: Name:', Yuki.util.sendCode(guild.name, { code: 'fix' }), true)
			.addField(':id: ID:', Yuki.util.sendCode(guild.id, { code: 'js' }), true)
			.addField(`:hash: Channels [${guild.channels.size}]:`, Yuki.util.sendCode(`Categories: ${Categories} / Text: ${textChannel} / Voice: ${voiceChannel}`, { code: 'py' }), false)
			.addField(`:busts_in_silhouette: Members [${guild.memberCount}]:`, Yuki.util.sendCode(`Humans: ${guild.memberCount - guild.members.filter(m => m.user.bot).size} / Bots: ${guild.members.filter(m => m.user.bot).size}`, { code: 'py' }), false)
			.addField(`${flags[guild.region]} Region:`, Yuki.util.sendCode(region[guild.region], { code: 'py' }), true)
			.addField(':art: Roles:', Yuki.util.sendCode(guild.roles.size, { code: 'py' }), true)
			.addField(':slight_smile: Emojis:', Yuki.util.sendCode(guild.emojis.size, { code: 'py' }), true)
			.addField(':crown: Owner:', Yuki.util.sendCode(guild.owner.user.tag, { code: 'js' }), true)
			.setFooter(`Server created in: ${moment(guild.createdAt).format('l')} - ${moment(guild.createdAt).startOf('hour').fromNow()}`)
		message.channel.send(embed);
	}
};