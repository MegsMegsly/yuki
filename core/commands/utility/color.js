const fetch = require('node-fetch');

module.exports = {
	name: 'color',
	aliases: ['colour'],
	description: 'Shows color information',
	category: 'utility',
    enabled: true,
    async execute(Yuki, message, args) {
        message.channel.startTyping();
        if (!args.length) return message.channel.send(new Yuki.RichEmbed().setDescription(Yuki.util.sendCode(`WARN: you need to type something!`, { code: 'ml' }))).then(message.channel.stopTyping());
        try {
            const hexcode = args.join(' ').slice(1)
            const colorInfo = await fetch(`http://www.thecolorapi.com/id?format=json&hex=${hexcode}`).then((response) => response.json());
            const embed = new Yuki.RichEmbed()
                .setColor(hexcode)
                .setThumbnail(`https://dummyimage.com/512/${hexcode}/&text=%20`)
                .addField(':hash: Hex', Yuki.util.sendCode(colorInfo.hex.value, { code: 'css' }))
                .addField(':red_square: RGB', Yuki.util.sendCode(colorInfo.rgb.value, { code: 'css' }))
                .addField(':green_square: HSL', Yuki.util.sendCode(colorInfo.hsl.value, { code: 'css' }))
                .addField(':purple_square: CMYK', Yuki.util.sendCode(colorInfo.cmyk.value, { code: 'css' }))
                .setFooter(`Color Name: ${colorInfo.name.value}`)
            message.channel.send(embed).then(message.channel.stopTyping());
        } catch (error) {
            const embed = new Yuki.RichEmbed()
                .setColor(Yuki.util.hexColor.error)
                .setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
            message.channel.send(embed).then(message.channel.stopTyping());
        }
    }
}