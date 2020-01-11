const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let user = message.mentions.users.first() || message.author;
	let access = db.fetch(`access_${user.id}`);
	if(access === null) access = "No Admin Access";

	if(access == "Admin Access") {
		let embed = new discord.RichEmbed()
			.setColor(color.lightblue)
				.addField("Admin Access:", "✅")
			message.channel.send(embed)
	}

	if(access == "No Admin Access") {
		let embed = new discord.RichEmbed()
			.setColor(color.lightblue)
				.addField("Admin Access:", "❌")
			message.channel.send(embed)
	}
};

module.exports.help = {
  name: "access",
  aliases: [],
  description: "Shows if you have Admin Access.",
  usage: ";access.",
  noalias: "No Aliases"
}