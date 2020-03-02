const fetch = require('node-fetch');
const moment = require('moment');

const baseURL = 'https://hastebin.com';

module.exports = {
	name: 'hastebin',
	aliases: ['haste'],
	description: 'Creates annotations in hastebin',
	category: 'utility',
    usage: '<text>',
    requirements: { arguments: true },
    enabled: true,
    async execute(Yuki, message, args) {
        try {
            const options = {
                method: 'POST',
                body: args.join(' '),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`${baseURL}/documents`, options).then((response) => response.json());
            message.channel.send(new Yuki.RichEmbed()
                .setColor(Yuki.util.hexColor.default)
                .setDescription(`${baseURL}/${response.key}`)
            );
        } catch (error) {
            message.channel.send(new Yuki.RichEmbed()
                .setColor(Yuki.util.hexColor.error)
                .setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
            );
        }
    }
}