module.exports = (Yuki) => {
	Yuki.user.setPresence({ activity: { name: 'Init' } });
	const presences = [

		{
			name: process.env.PREFIX,
			type: 'WATCHING'
		}, {
			name: `${Yuki.guilds.cache.size} Guilds`,
			type: 'WATCHING'
		}, {
			name: `${Yuki.users.cache.size} Users`,
			type: 'WATCHING'
		}
	];

	setInterval(() => Yuki.user.setPresence({ activity: Yuki.util.randomItem(presences) }), 60 * 1000);
	console.log(`Connected with ${Yuki.user.tag}`);
};