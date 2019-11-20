module.exports = (Yuki) => {
	Yuki.user.setPresence({ game: { name: process.env.PREFIX, type: 'WATCHING' }, status: 'online' });
	console.log(`Connected with ${Yuki.user.tag}`);
};