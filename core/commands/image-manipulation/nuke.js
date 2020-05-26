const Jimp = require('jimp');

module.exports = {
	name: 'nuke',
	aliases: [],
	description: 'Tones image colors',
        usage: '<@user>',
	category: 'image-manipulation',
	enabled: true,
	execute(Yuki, message, args) {
                message.channel.startTyping();
		const user = message.mentions.users.first() || Yuki.users.cache.get(args[0]) || message.author;
		Jimp.read(user.avatarURL({ format: 'png', size: 2048 }))
  			.then(async (image) => {
				image.pixelate(1);
				image.contrast(0.95);
				image.posterize(8);
  				await message.channel.send({ files: [{ attachment: await image.getBufferAsync(Jimp.MIME_PNG), name: 'grey.png' }] }).then(message.channel.stopTyping());
  		  	})
  		  	.catch((error) => {
  		  		const embed = new Yuki.RichEmbed()
  		  			.setColor(Yuki.util.hexColor.error)
  		  			.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
  		  		message.channel.send(embed).then(message.channel.stopTyping());
  		  	});
	}
};