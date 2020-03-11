module.exports = {
	name: 'invite',
	description: 'Invite link!',
	category: 'bot',
	enabled: true,
	async execute(Yuki, message, args) {
		const invite = await Yuki.generateInvite(['ADMINISTRATOR']);
	        message.channel.send(new Yuki.MessageEmbed()
	        	.setColor(Yuki.util.hexColor.default)
	        	.setDescription(`(つ≧▽≦)つ This is my **[invite link!](${invite})**`)
	        );
	}
};