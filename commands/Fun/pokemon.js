const discord = require("discord.js");
const color = require("../../colours.json");
const pokemon = require("../../pokemon.json")

module.exports.run = async(bot, message, args) => {
	const rand = Math.floor(Math.random() * 802);
	const poke = rand > 0 ? rand : Math.floor(Math.random() * 802);
	const pokem = pokemon[poke];

	const embed = new discord.RichEmbed()
		.setTitle("You have 15 seconds to guess! Who's that Pokémon?")
		.setAuthor(message.member.displayName, message.author.displayAvatarURL)
		.setImage(pokem.imageURL)
		.setColor(color.random)

	const msg = await message.channel.send({ embed });
	const filter = m => m.author.id === message.author.id;
	const attempts = await msg.channel.awaitMessages(filter, { time: 15000, max: 1});

	if(!attempts || !attempts.size) {
		msg.delete();
		return message.channel.send(`Ba-Baka! You took too long to answer. It was **${capitalize(pokem.name)}**.`)
	}

	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const answer = attempts.first().content.toLowerCase();

	if (answer === pokem.name.toLowerCase()) {
		// await msg.edit({embed: null});
		return msg.channel.send(`Well done, **${capitalize(pokem.name)}** was correct.`)
	}
		// await msg.edit({embed: null});
	return msg.channel.send(`Ba-Baka! You answered incorrectly, It was **${capitalize(pokem.name)}**.`)
};

module.exports.help = {
  name: "pokemon",
  aliases: ["guessthatpokemon", "pkmn"],
  description: "Guess That Pokémon!.",
  usage: ";pokemon",
  //noalias: "No Aliases"
}