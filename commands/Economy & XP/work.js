const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let jobbies = db.fetch(`job_${message.author.id}`)
	
	if(jobbies === null) {
		return message.channel.send("You have no job.")
	}

	if(jobbies === "Taxi Driver") {
		let amount = 25000;
		let eggAmount = 5000;
		let randomAmount = Math.floor(Math.random() * amount) + 1;
		let randomEggChance = Math.round(Math.random() * 100) + 1;


		message.channel.send(`You worked as a Taxi Driver and got ${randomAmount} Bacons!`)


		if(randomEggChance > 50) {
			db.add(`egg_${message.author.id}`, eggAmount);

			return message.channel.send(`You also got ${eggAmount} eggs!`)
		}

		db.add(`bacon_${message.author.id}`, randomAmount);
	}
};

module.exports.help = {
  name: "work",
  aliases: [],
  description: "Work to earn money.",
  usage: ";work",
  //noalias: "No Aliases"
}