const fetch = require('node-fetch');
const moment = require('moment');

const baseURL = 'https://hastebin.com';

module.exports = {
	name: 'hastebin',
	aliases: ['haste'],
	description: '',
	category: 'utility',
    enabled: true,
    async execute(Yuki, message, args) {
        message.channel.startTyping();
        const options = {
            method: 'POST',
            body: args.slice(0).join(' '),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let res = await fetch(`${baseURL}/documents`, options);
        res = await res.json();

        try {
            if (!args[0]) return message.channel.send(new Yuki.RichEmbed()
                .setDescription(Yuki.util.sendCode(`WARN: you need to type something!`, { code: 'ml' }))
                ).then(message.channel.stopTyping());
            const embed = new Yuki.RichEmbed()
                .setDescription(`${baseURL}/${res.key}`)
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