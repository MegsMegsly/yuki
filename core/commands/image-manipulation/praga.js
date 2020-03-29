const Jimp = require('jimp');
const path = require('path');

module.exports = {
	name: 'praga',
	aliases: ['morrepraga'],
	description: 'For fun',
        usage: '<@user>',
	category: 'image-manipulation',
	enabled: true,
	execute(Yuki, message, args) {
                message.channel.startTyping();
		const user = message.mentions.users.first() || Yuki.users.cache.get(args[0]) || message.author;
		Jimp.read(user.avatarURL({ format: 'png', size: 2048 }))
  			.then(async (image) => {
  				const praga = await Jimp.read(path.resolve(__dirname, '..', '..', 'assets', 'jpeg', 'praga.jpg'));
  				image.resize(300, 300);
  				praga.composite(image, 140, 190);
  				await message.channel.send({ files: [{ attachment: await praga.getBufferAsync(Jimp.MIME_JPEG), name: 'praga.jpg' }] }).then(message.channel.stopTyping());
  		  	})
  		  	.catch((error) => {
  		  		message.channel.send(new Yuki.MessageEmbed()
  		  			.setColor(Yuki.util.hexColor.error)
  		  			.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
  		  		).then(message.channel.stopTyping());
  		  	});
	}
};