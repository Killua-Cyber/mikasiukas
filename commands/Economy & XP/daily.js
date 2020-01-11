const discord = require("discord.js");
const color = require("../../colours.json");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async(bot, message, args) => {
	let vep = db.fetch(`vip_${message.author.id}`)

	let baconAmt = 150000;
	let eggAmt = 15000;
	let xpAmt = 100;
	let max = 100000000;

	if(vep == "VIP!") {
		baconAmt = 300000;
		eggAmt = 30000;
		xpAmt = 200;
		max = 500000000;
	}

	let timeout = 86400000;

	let lvl = db.fetch(`level_${message.guild.id}_${message.author.id}`);

	if(lvl == 100) {
		xpAmt = 0;
	};

	let bacon = db.fetch(`bacon_${message.author.id}`)
    if(bacon === null) bacon = 0;
    let egg = db.fetch(`egg_${message.author.id}`)
    if(egg === null) egg = 0;

	if(bacon == max) {
		baconAmt = 0;
	}

	if(bacon == max) {
		eggAmt = 0;
	}
 
    let daily = await db.fetch(`daily_${message.author.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

		message.channel.send(`You already collected your daily reward! Come back and collect it in **${time.hours}h, ${time.minutes}m, ${time.seconds}s**`)
	} else {
	let embed = new discord.RichEmbed()
		.setTitle(`Your Daily Reward:`)
		.setDescription(`${baconAmt} 🥓 \n${eggAmt} 🥚\n${xpAmt} XP`)
	message.channel.send(embed);

		db.add(`bacon_${message.author.id}`, baconAmt);
		db.add(`egg_${message.author.id}`, eggAmt);
		db.add(`xp_${message.author.id}`, xpAmt);
		db.set(`daily_${message.author.id}`, Date.now())
	};
};

module.exports.help = {
  name: "daily",
  aliases: [],
  description: "Gives you your daily reward.",
  usage: ";daily",
  noalias: "No Aliases"
}