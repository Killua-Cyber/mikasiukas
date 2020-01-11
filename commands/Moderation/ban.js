const discord = require("discord.js");
const color = require("../../colours.json");

module.exports.run = async(bot, message, args) => {
	const user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	const reason = args.slice(1).join(" ");
	if(!reason) reason = "No reason given."

	if (!message.member.hasPermission("BAN_MEMBERS")) {
		return message.channel.send("You don't have permissions to use this command.")
	}

	if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
		return message.channel.send("I don't have permissions to use this command.")
	}

	if (!user.bannable) {
		return message.channel.send("Can't ban this user.")
	}

	user.ban(reason);
	message.channel.send(`Banned ${user.username} for ${reason}`)
};

module.exports.help = {
  name: "ban",
  aliases: ["gtfo"],
  description: "Bans a mentioned user from the guild.",
  usage: ";ban <user> [reason]"
  //noalias: "No Aliases"
}