const {bot} = require("../index")

bot.on("ready", async () => {
	console.log(`${bot.user.username} is ready to kick ass!`);
	bot.user.setActivity(`over Eren`, {type: "WATCHING"})
	bot.user.setStatus("dnd")
});