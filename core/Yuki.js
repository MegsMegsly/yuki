require('dotenv/config');

const { Client, Collection, RichEmbed } =  require('discord.js');
const fs = require('fs');

const Yuki = new Client();

Yuki.commands = new Collection();
Yuki.aliases = new Collection();
Yuki.RichEmbed = RichEmbed;

(events = module.exports.events = (dir = `${__dirname}/events/`) => {
	fs.readdir(dir, (error, files) => {
		if (error) return console.log(error);
		files.forEach((file) => {
			if (fs.lstatSync(dir + file).isDirectory()) {
				events(dir + file + '/');
				return;
			}
			const event = require(dir + file);
			Yuki.on(file.split('.')[0], event.bind(null, Yuki));
		});
	});
})();

(commands = module.exports.commands = (dir = `${__dirname}/commands/`) => {
	fs.readdir(dir, (error, files) => {
		if (error) return console.log(error);
		files.forEach((file) => {
			if (fs.lstatSync(dir + file).isDirectory()) {
				commands(dir + file + '/');
				return;
			}
			delete require.cache[require.resolve(dir + file)];
			const command = require(dir + file);
			Yuki.commands.set(command.name, command);
			if (command.aliases) command.aliases.forEach((alias) => Yuki.aliases.set(alias, command.name));
		});
	});
})();

Yuki.login(process.env.YUKI_TOKEN).catch(console.error);