const { color } = require("../../config.json")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const { owner } =  require('../../config.json')

module.exports = {
  name: "add",
  category: "developer",
  run: async(bot, msg, args) => {
    
    //if(!owner.includes(msg.author.id)) return msg.reply("Only staff or owner can run this command")
    if(!args[0]) {
	    let x = new MessageEmbed()
      .addField("<:no:768994814527143986> Commands Prefix: Developer Access", "Commands: t!add <dl/wl/gems> <amount> <@user>")
	    .setColor("#FC0000")
	    return msg.reply(x)
    }
    
    if(args[0] === "wl") {
      let wl = args[1]
      if(!wl) {
        let x = new MessageEmbed()
        .addField("<:no:768994814527143986> Commands Prefix: Developer Access", "Error: Input the amount of worlds locks.")
        .setColor("#FC0000")
        return msg.channel.send(x)
      }
      
      let orang = msg.mentions.users.first() || msg.author;
    
      if(isNaN(wl)) return msg.reply("Invalid number")
      
      let embed = new MessageEmbed()
      .setDescription(`**You has been add ${wl} world lock to ${orang}**`)
      .setColor("#FC0000")
      msg.channel.send(embed);
      
      db.add(`wl_${orang.id}`, wl)
    }
    
    if(args[0] === "dl") {
      let dl = args[1]
      if(!dl) {
        let x = new MessageEmbed()
        .addField("<:no:768994814527143986> Commands Prefix: Developer Access", "Error: Input the amount of diamonds locks.")
        .setColor("#FC0000")
        return msg.reply(x)
      }
      if(isNaN(dl)) return msg.reply("Invalid number")
      //if(!dl) return msg.reply("Please put total diamond lock you want")
      
      let orang = msg.mentions.users.first() || msg.author;
      
      let embed = new MessageEmbed()
      .setDescription(`**You has been add ${dl} diamond lock to ${orang}**`)
      .setColor(color)
      msg.channel.send(embed)
      
      db.add(`dl_${orang.id}`, dl)
    }
    
    if(args[0] === "gems") {
      let gems = args[1]
      if(!gems) return msg.reply("please put total gems what do you want")
      if(isNaN(gems)) return msg.reply("Invalid number")
      
      let orang = msg.mentions.users.first() || msg.author;
      
      let embed = new MessageEmbed()
      .setDescription(`**${msg.author} add ${gems} gems to ${orang}**`)
      .setColor(color)
      msg.channel.send(embed)
      db.add(`gems_${orang.id}`, gems)
    }
    
  }
}
module.exports.requirements = {
  ownerOnly: true,
  userPerms: [],
  clientPerms: []
}