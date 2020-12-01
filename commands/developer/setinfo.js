const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json")

module.exports = {
  name: "setinfo",
  aliases: "set-info",
  run: async(client, msg, args) => {
    
    if(!client.moderator.includes(msg.author.id)) return;
    
  let d = args.join(' ')
  if(!d) return msg.reply("You cant set for nothing description")
  
    let a = new MessageEmbed()
    .setAuthor(`${msg.author.username} set info`)
    .setThumbnail(msg.author.displayAvatarURL())
    .setDescription(`Description:\n**${d}**`)
    .setColor(color)
    msg.channel.send(a)
    
    db.set(`decs_${msg.author.id}`, d)
  
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}