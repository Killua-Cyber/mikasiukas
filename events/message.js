const {bot} = require("../index");
const config = require("../config.json");
const discord = require("discord.js");
const color = require("../colours.json");

bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return message.channel.send("Stfu, don't DM me.")

	let user = message.mentions.users.first();
	if (!user) user = message.author;

	let prefix = ";";
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	let command;

	if (!message.content.startsWith(prefix)) return;

	if (bot.commands.has(cmd)) {
		command = bot.commands.get(cmd);
	} else {
		command = bot.commands.get(bot.aliases.get(cmd));
	}

	if (command) command.run(bot, message, args);
});