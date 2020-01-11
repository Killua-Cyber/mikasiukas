const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let vep = db.fetch(`vip_${message.author.id}`)
	if (vep === null) vep = "No VIP"

	let status = "";

	if(vep == "VIP!") {
		status = "✅"
	}

	if(vep == "No VIP") {
		status = "❌"
	}

	const embed = new discord.RichEmbed()
		.setColor(color.pasta)
			.setDescription(`VIP Perks: \n - 500M Max Bacon \n - 2x Daily Reward \n - 25M Max Eggs \n - 2x XP`)
			.addField("VIP Status:", `${status}`)
			.setFooter("To buy VIP do ;buy-vip (costs 500k eggs)")
	message.channel.send(embed);
};

module.exports.help = {
  name: "vip",
  aliases: [],
  description: "V.I.P thingie.",
  usage: ";vip",
  noalias: "No Aliases"
}