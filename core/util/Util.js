module.exports = {
	hexColor: {
		embed(message) {
			return message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : '#36393F';
		},
		success: '#77B255',
		warning: '#FFCA42',
		error: '#FF0000'
	},

	sendCode(string, options = {}) {
		return `\`\`\`${options.code}\n${string}\`\`\``;
	}
};