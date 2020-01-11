const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let marr = db.fetch(`marriage_${message.guild.id}_${message.author.id}`);
	let marrr = db.fetch(`marriage_${message.guild.id}_${marr}`);

	if(marr === null) {
		return message.channel.send(`You are not married to anyone.`)
	} else {
		db.delete(`marriage_${message.guild.id}_${message.author.id}`);
		db.delete(`marre_${message.guild.id}_${message.author.id}`);
		db.delete(`marriage_${message.guild.id}_${marr}`);
		db.delete(`marre_${message.guild.id}_${marr}`);

		return message.channel.send(`You are now single.`)
	}

};

module.exports.help = {
  name: "divorce",
  aliases: [],
  description: "Divorce if you're married.",
  usage: ";divorce",
  //noalias: "No Aliases"
}