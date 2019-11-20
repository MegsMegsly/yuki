module.exports = {
	name: 'upload',
	aliases: ['up'],
	description: 'Upload images to catbox',
	category: 'owner',
	enabled: true,
	execute(Yuki, message, args) {
		request({
			method: 'POST',
			url: 'https://catbox.moe/user/api.php',
			form: {
				reqtype: 'urlupload',
				userhash: process.env.CATBOX_USERHASH,
				url: args[0]
			}
		})
		.then((data) => {
			const embed = new Yuki.RichEmbed()
				.setDescription(`**[Download Link](${data.body})**`)
				.setImage(data.body)
			message.channel.send(embed);
		})
		.catch((error) => {
			console.log(error);
		});

		function request(data) {
		    return new Promise(function(resolve, reject) {
		        require('request')(data, function(error, response, body) {
		            if (!error) {
		                resolve(response);
		            } else {
		                reject(error);
		            }
		        });
		    });
		}
	}
};