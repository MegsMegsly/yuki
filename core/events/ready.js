module.exports = (Yuki) => {
	const presences = [

		{
			name: process.env.PREFIX,
			type: 'WATCHING'
		}, {
			name: `${Yuki.guilds.size} Guilds`,
			type: 'WATCHING'
		}, {
			name: `${Yuki.users.size} Users`,
			type: 'WATCHING'
		}
	];

	setInterval(() => {
		Yuki.user.setPresence({ game: Yuki.util.randomItem(presences) })
	}, 60 * 1000);
	console.log(`Connected with ${Yuki.user.tag}`);
};