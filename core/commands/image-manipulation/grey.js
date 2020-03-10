const Jimp = require('jimp');

module.exports = {
	name: 'grey',
	aliases: ['greyscale'],
	description: 'Image turns grey',
	category: 'image-manipulation',
	enabled: true,
	execute(Yuki, message, args) {
		const user = message.mentions.users.first() || message.author;
		Jimp.read(user.avatarURL({ format: 'png', size: 2048 }))
  			.then(async (image) => {
  				image.greyscale();
  				await message.channel.send({ files: [{ attachment: await image.getBufferAsync(Jimp.MIME_PNG), name: 'grey.png' }] });
  		  	})
  		  	.catch((error) => {
  		  		const embed = new Yuki.RichEmbed()
  		  			.setColor(Yuki.util.hexColor.error)
  		  			.setDescription(Yuki.util.sendCode(`Error: ${error.message}`, { code: 'js' }))
  		  		message.channel.send(embed);
  		  	});
	}
};