const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let eggs = db.fetch(`egg_${message.guild.id}_${message.author.id}`)
	
	let vep = db.fetch(`vip_${message.author.id}`)

	if(eggs < 500000) {
		return message.channel.send(`You don't have **500,000** Eggs!`)
	}

	if(vep == "VIP!") {
		return message.channel.send("You already have VIP!")
	}

	db.set(`vip_${message.author.id}`, "VIP!")
	return message.channel.send("You bought VIP on the bot!")
};

module.exports.help = {
  name: "buy-vip",
  aliases: [],
  description: "Buy VIP on the bot.",
  usage: ";buy-vip",
  noalias: "No Aliases"
}