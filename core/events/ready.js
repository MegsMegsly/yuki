module.exports = (Yuki) => {
	Yuki.user.setPresence({ game: { name: 'domination of 13 asian countries', type: 'STREAMING', url: 'http://twitch.tv/meggatbh' }, status: 'dnd' });
	console.log(`Connected with ${Yuki.user.tag}`);
};