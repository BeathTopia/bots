const db = require("quick.db")

module.exports = {
  name: "with",
  description: "take your gems in atm",
  usage: "with <gems in atm>",
  category: "growtopia",
  run: async(client, msg, args) => {
    
    //if(!client.staff.includes(msg.author.id)) return msg.reply("Command maintenance")
    
    let atm = db.fetch(`deposit_${msg.author.id}`)
    if(atm === null) atm = 0;
    
    let take = args[0]
    if(!take) return msg.reply("You not put total gems you want take")
    
    if(isNaN(take)) return msg.reply("Invalid number")
    
    if(atm < take) return msg.reply("You not have that enough gems in atm")
    
    if(msg.content.includes("-")) return msg.reply(`Uh, you can't take your gems with negative number`)
    
    msg.channel.send(`<:atm:725384944716742686> Succesfuly take **${take} gems** in atm`)
    db.subtract(`deposit_${msg.author.id}`, take)
    db.add(`gems_${msg.author.id}`, take)
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}