const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	db.delete(`vip_${message.author.id}`);
	return message.channel.send(`Done.`)
};

module.exports.help = {
  name: "remove-vip",
  aliases: [],
  description: "Remove vip.",
  usage: ";remove-vip",
  noalias: "No Aliases"
}