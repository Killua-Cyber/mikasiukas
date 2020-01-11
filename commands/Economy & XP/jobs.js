const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let jobbies = db.fetch(`job_${message.author.id}`)
	if(jobbies === null) jobbies = "You have no job."

	if(!args[0]) {
		let embed = new discord.RichEmbed()
			.setColor(color.random)
				.setTitle(`${jobbies || `You are working as ${jobbies}`}\nCurrent Jobs:`)
				.setDescription("Taxi Driver | ID: 1\nWoodcutter | ID: 2")
				.setFooter(`;jobs join <id> | ;jobs leave`)
		return message.channel.send(embed)
	}

	if(args[0].toLowerCase() === "join") {
		if(!args[1]) {
			return message.channel.send(`Choose a job!`)
		}

		if(args[1] === "1") {
			db.set(`job_${message.author.id}`, "Taxi Driver");
			return message.channel.send(`You are now working as a Taxi Driver!`)
		}

		if(args[1] === "2") {
			db.set(`job_${message.author.id}`, "Woodcutter");
			return message.channel.send(`You are now working as a Woodcutter!`)
		}
	}

	if(args[0].toLowerCase() === "leave") {
		db.delete(`job_${message.author.id}`);
		return message.channel.send(`You left your job.`)
	}
};

module.exports.help = {
  name: "jobs",
  aliases: [],
  description: "Displays available jobs | join/leave a job.",
  usage: ";jobs <join/leave> <job>",
  noalias: "No Aliases"
}