module.exports = {
	randomItem(items) {
		return items[Math.floor(Math.random() * items.length)];
	},

	hexColor: {
		embed(message) {
			return message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : '#36393F';
		},
		success: '#77B255',
		warning: '#FFCA42',
		error: '#FF0000',
		default: '#445F52'
	},

	sendCode(string, options = {}) {
		return `\`\`\`${options.code}\n${string}\`\`\``;
	}
};