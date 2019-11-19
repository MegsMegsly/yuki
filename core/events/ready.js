module.exports = (Yuki) => {
	Yuki.user.setPresence({ game: { name: process.env.PREFIX, type: 'WATCHING' }, status: 'online' });
};