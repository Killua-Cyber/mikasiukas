const discord = require("discord.js");
const color = require("../../colours.json");

module.exports.run = async(bot, message, args) => {
  if(!args[0]) {
    let embed = new discord.RichEmbed()
      .setColor(color.random)
        .setTitle(`Modules:`)
        .setDescription(`Moderation\nMisc\nFun\nAnime\nEconomy`)
        .setFooter(`Do ;help <module> to get a list of commands!`)
    return message.channel.send(embed)
  }

  if(args[0].toLowerCase() === "moderation") {
     let embed = new discord.RichEmbed()
      .setColor(color.random)
        .setTitle(`Moderation Commands:`)
        .setDescription("```;ban```")
        .setFooter(`Do ;help <command> to get more info about a command!`)
    return message.channel.send(embed)
  }

  if(args[0].toLowerCase() === "misc") {
     let embed = new discord.RichEmbed()
      .setColor(color.random)
        .setTitle(`Misc. Commands:`)
        .setDescription("```;access\n;buy-vip\n;vip```")
        .setFooter(`Do ;help <command> to get more info about a command!`)
    return message.channel.send(embed)
  }

  if(args[0].toLowerCase() === "fun") {
     let embed = new discord.RichEmbed()
      .setColor(color.random)
        .setTitle(`Fun Commands:`)
        .setDescription("```;pokemon\n;marry\n;divorce\n;status```")
        .setFooter(`Do ;help <command> to get more info about a command!`)
    return message.channel.send(embed)
  }

  if(args[0].toLowerCase() === "economy") {
     let embed = new discord.RichEmbed()
      .setColor(color.random)
        .setTitle(`Economy Commands:`)
        .setDescription("```;daily\n;jobs\n;profile```")
        .setFooter(`Do ;help <command> to get more info about a command!`)
    return message.channel.send(embed)
  }
};

module.exports.help = {
  name: "help",
  aliases: ["cmds", "commands"],
  description: "Gives a list of commands.",
  usage: "No Usage.",
  //noalias: "No Aliases"
}