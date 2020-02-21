const fetch = require('node-fetch');
const moment = require('moment');

const baseURL = 'https://hastebin.com';

module.exports = {
	name: 'hastebin',
	aliases: ['haste'],
	description: 'Creates annotations in hastebin',
	category: 'utility',
    enabled: true,
    async execute(Yuki, message, args) {
        message.channel.startTyping();
        if (!args.length) return message.channel.send(new Yuki.RichEmbed().setDescription(Yuki.util.sendCode(`WARN: you need to type something!`, { code: 'ml' }))).then(message.channel.stopTyping());
        try {
            const options = {
                method: 'POST',
                body: args.join(' '),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`${baseURL}/documents`, options).then((response) => response.json());
            const embed = new Yuki.RichEmbed()
                .setDescription(`${baseURL}/${response.key}`)
                .setFooter(`${moment(new Date()).format('l')} - ${moment(new Date()).format('LTS')}`)
            message.channel.send(embed).then(message.channel.stopTyping());
        } catch (error) {
            const embed = new Yuki.RichEmbed()
                .setColor(Yuki.util.hexColor.error)
                .setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
            message.channel.send(embed).then(message.channel.stopTyping());
        }
    }
}