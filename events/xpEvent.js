const {bot} = require("../index");
const config = require("../config.json");
const discord = require("discord.js");
const color = require("../colours.json");
const db = require("quick.db");

bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return;
	
	let xp = db.fetch(`xp_${message.guild.id}_${message.author.id}`);
	let level = db.fetch(`level_${message.guild.id}_${message.author.id}`);

	if(xp === null) xp = 0;
	if(level === null) level = 1;

	let vep = db.fetch(`vip_${message.author.id}`)

	let randomXpAdd = Math.floor(Math.random() * 12) + 1;
	let xpaddcd = 60000;

	if(vep == "VIP!") {
		randomXpAdd = Math.floor(Math.random() * 24) + 1;
	}

	if(level == 100) {
		return;
	} // That'll be 14800 xp

	let lastxpadd = await db.fetch(`lastXpAdd_${message.guild.id}_${message.author.id}`);
	if (lastxpadd !== null && xpaddcd - (Date.now() - lastxpadd) > 0) {
		return;
	} else {
		db.set(`lastXpAdd_${message.guild.id}_${message.author.id}`, Date.now());
		db.add(`xp_${message.guild.id}_${message.author.id}`, randomXpAdd);
		console.log(`${message.author.tag} got ${randomXpAdd} xp!`)
	};

	setInterval(() => {
		let xp = db.fetch(`xp_${message.guild.id}_${message.author.id}`);
		let level = db.fetch(`level_${message.guild.id}_${message.author.id}`);

		if(xp === null) xp = 0;
		if(level === null) level = 1;

		let nextLevel = level * 150;
		if(xp >= nextLevel) {
			db.set(`level_${message.guild.id}_${message.author.id}`, level+1);
				message.channel.send(`Congratulations, ${message.author}! You just advanced to level ${level+1}!`)
				return;
		}
	}, 2000)
}); 