module.exports = {
	name: 'invite',
	description: 'Invite link!',
	category: 'bot',
	enabled: true,
	async execute(Yuki, message, args) {
        message.channel.startTyping();
        const invite = await Yuki.generateInvite(['ADMINISTRATOR']);
        const embed = new Yuki.RichEmbed()
            .setDescription(`(つ≧▽≦)つ This is my **[invite link!](${invite})**`)
        message.channel.send(embed).then(message.channel.stopTyping());
	}
};