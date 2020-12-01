const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "deposit",
  description: "deposit your gems to atm",
  usage: "deposit <total gems>",
  aliases: ["dep"],
  category: "growtopia",
  run: async(client, msg, args) => {
    
   // if(!client.staff.includes(msg.author.id)) return msg.reply("Command is maintenance")
    
    let gems = db.fetch(`gems_${msg.author.id}`)
    
    let a = args[0]
    if(!a) {
      let x = new MessageEmbed()
      .setDescription("<:no:768994814527143986> **Input total gems that's you want to deposit.**")
      .setColor("#FC0000")
      return msg.reply(x)
    }
    
    if(msg.content.includes('-')) {
      let y = new MessageEmbed()
      .setDescription("<:no:768994814527143986> **You can't deposit with negative numbers!**")
      .setColor("#FC0000")
      return msg.reply(y)
    }
      
    if(isNaN(a)) { return msg.reply("Invalid number of gems")
                 }
    
    if(gems < a) return msg.reply("You not have that enough gems")
    
    msg.channel.send(`<:atm:725384944716742686> Succesfully deposit **${a} gems** to atm`)
    
    db.add(`deposit_${msg.author.id}`, a)
    db.subtract(`gems_${msg.author.id}`, a)
    
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}