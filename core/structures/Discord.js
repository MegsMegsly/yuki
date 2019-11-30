const { Client, Collection, RichEmbed } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			disableEveryone: true
		});

		this.commands = new Collection();
		this.aliases = new Collection();
		this.RichEmbed = RichEmbed;
		this.util = require('../util/Util.js');
	}
};