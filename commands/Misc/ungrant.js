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

	if(access == "No Admin Access") {
		return message.channel.send("The person doesn't have Admin Access")
	}

	db.set(`access_${user.id}`, "No Admin Access");
	return message.channel.send(`Removed Admin Access from **${user.username}**`)
};

module.exports.help = {
  name: "ungrant",
  aliases: [],
  description: "Ungrant Admin Access.",
  usage: ";ungrant <user>.",
  noalias: "No Aliases"
}