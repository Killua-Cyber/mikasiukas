const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	let marryPerson = message.mentions.users.first().id;
	let mar = db.fetch(`marre_${message.guild.id}_${marryPerson}`)
	let mare = db.fetch(`marre_${message.guild.id}_${message.author.id}`)
	// db.set(`marriage_${message.guild.id}_${message.author.id}`, marryPerson);
	let marra = db.fetch(`marriage_${message.guild.id}_${message.author.id}`);

	if(mar == 1) {
		return message.channel.send(`This person is already married to someone or you already are married with them.`)
	}

	if(mare == 1) {
		return message.channel.send(`You are already married to someone or you already are married with them.`)
	}

	if(marryPerson == message.author.id) {
		return message.channel.send(`You cannot marry yourself.`)
	}

	if(marryPerson == bot.user.id) {
		return message.channel.send(`You cannot marry a bot, they don't respond.`)
	}

	const filter = m => m.author.id === message.author.id || m.author.id === marryPerson;
	message.channel.send(`<@${marryPerson}>, ${message.author.toString()} proposed to you! Either say \`Yes\` or \`No\`! You got 1 minute.`)
	message.channel.awaitMessages(filter, {
		max: 1,
		time: 60000
	}).then(collected => {

		if(collected.first().content.toLowerCase() === "yes") {
			db.set(`marriage_${message.guild.id}_${message.author.id}`, marryPerson);
			db.set(`marriage_${message.guild.id}_${marryPerson}`, message.author.id);
			db.add(`marre_${message.guild.id}_${marryPerson}`, 1);
			db.add(`marre_${message.guild.id}_${message.author.id}`, 1);

			return message.channel.send(`You are now married!`)
		}

		if(collected.first().content.toLowerCase() === "no") {
			return message.channel.send(`<@${marryPerson}> said no...`)
		}
	}).catch(err => {
		return message.channel.send(`Time has expired and <@${marryPerson}> rejected you :C`).then(r => r.delete(5000))
	})
};

module.exports.help = {
  name: "marry",
  aliases: [],
  description: "Marry an online person cuz u lonely af.",
  usage: ";marry <@user>",
  //noalias: "No Aliases"
}