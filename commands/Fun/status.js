const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let marry = await db.fetch(`marriage_${message.guild.id}_${message.author.id}`);

	 if(marry === null) {
	 	marry = "Single."
	 } else {
	 	let ye = bot.users.get(marry) || await bot.fetchUser(marry);

	 	marry = `Married to ${ye.tag}`
	 }

	 message.channel.send(marry);
};

module.exports.help = {
  name: "status",
  aliases: [],
  description: "Check your relationship status.",
  usage: ";status",
  //noalias: "No Aliases"
}