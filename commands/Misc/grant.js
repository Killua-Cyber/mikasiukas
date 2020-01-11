const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let user = message.mentions.users.first();

	let access = db.fetch(`access_${user.id}`);
	if(access === null) access = "No Admin Access";

	if(message.author.id != "353890244816404481") {
		return message.channel.send("You're not my developer!")
	}

	if(access == "Admin Access") {
		return message.channel.send("The person already has Admin Access")
	}

	db.set(`access_${user.id}`, "Admin Access");
	return message.channel.send(`Granted Admin Access for **${user.username}**`);
};

module.exports.help = {
  name: "grant",
  aliases: [],
  description: "Grant Admin Access.",
  usage: ";grant <user>.",
  noalias: "No Aliases"
}