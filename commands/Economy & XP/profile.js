const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");

module.exports.run = async(bot, message, args) => {
	const target = message.mentions.users.first() || message.author;
	
		function abbrNum(n) {
	    if (!n || (n && typeof n !== 'number')) {
	      return '';
	    }

	    const ranges = [
	      { divider: 1e12 , suffix: 'T' },
	      { divider: 1e9 , suffix: 'B' },
	      { divider: 1e6 , suffix: 'M' },
	      { divider: 1e3 , suffix: 'K' }
	    ];
	    const range = ranges.find(r => Math.abs(n) >= r.divider);
	    if (range) {
	      return (n / range.divider).toString() + range.suffix;
	    }
	    return n.toString();
	}

	let max = 100000000;

	let lvl = db.fetch(`level_${message.guild.id}_${message.author.id}`);
    if(lvl === null) lvl = 1;
    let xp = db.fetch(`xp_${message.guild.id}_${message.author.id}`);
    if(xp === null) xp = 0;
    let bacon = db.fetch(`bacon_${message.author.id}`)
    if(bacon === null) bacon = 0;
    let egg = db.fetch(`egg_${message.author.id}`)
    if(egg === null) egg = 0;


	let profileEmb = new discord.RichEmbed()
		.setColor(color.lightblue)
			.setTitle(`${target.username}'s Profile`)
			.setThumbnail(target.displayAvatarURL)
			.addField(`Bacons:`, `${abbrNum(bacon) || bacon} 🥓`, true)
			.addField(`Eggs:`, `${abbrNum(egg) || egg} 🥚`, true)
			.addBlankField()
			.addField(`Level`, `${abbrNum(lvl)}`, true)
			.addField(`Total XP:`, `${abbrNum(xp)}`, true)

	message.channel.send(profileEmb)
};

module.exports.help = {
  name: "profile",
  aliases: ["p"],
  description: "Shows your or mentioned user's profile.",
  usage: ";profile [@user]",
  //noalias: "No Aliases"
}