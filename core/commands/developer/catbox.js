const Catbox = require('catbox.moe');

const catbox = new Catbox(process.env.CATBOX_USERHASH);

module.exports = {
	name: 'upload',
	aliases: ['cb'],
	description: 'Upload images to catbox',
	category: 'developer',
	enabled: true,
	execute(Yuki, message, args) {
		if(message.author.id !== process.env.OWNERID) return console.log(`Usou o comando upload: ${message.author.tag}`);
		catbox.upload(args[0])
			.then((url) => {
				const embed = new Yuki.RichEmbed()
					.setImage(url)
					.setDescription(`[Catbox URL](${url})`)
				message.channel.send(embed);
			})
			.catch((error) => {
				message.channel.send(error, { code: 'js' });
			})
	}
};