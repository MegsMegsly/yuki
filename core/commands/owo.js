exports.run = (Client, Yuki, message, params) => {
	const embed = new Client.RichEmbed()
    	.setColor('ffff')
        .setImage('https://media.discordapp.net/attachments/567802012566028289/621041381749686272/large.png?width=675&height=567')
        .setFooter('Sponsored by: Gabriel X aka Patrulha Anime');
    message.channel.send(embed);
};

exports.config = {
    name: 'owo',
    aliases: ['o'],
    permission: '',
    permlevel: 0,
    description: '',
    usage: ``,
    category: '',
    enabled: true
};