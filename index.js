const discord = require("discord.js");
const bot = new discord.Client();
const config = require("./config.json");

let lib = require("./lib/functions")

bot.aliases = new discord.Collection();
bot.commands = new discord.Collection();

lib.setup(bot);


module.exports.bot = bot;

bot.login(config.token)