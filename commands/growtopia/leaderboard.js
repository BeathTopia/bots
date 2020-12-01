const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json")

module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  usage: "leaderboard 242\nleaderboard gems",
  //category: "growtopia",
  description: "check leaderboard",
  run: async(client, msg, args) => {
    
    if(!args[0]) return msg.channel.send(`${client.prefix[msg.guild.id]}leaderboard 242\n${client.prefix[msg.guild.id]}leaderboard gems`)
    if(args[0] === "242") {
      let data = await db.all().filter(data => data.ID.startsWith(`wl`))
      data = data.sort((a, b) => b.data - a.data)
      
      data.length = 10
      let content = "";
    
      for(let i = 0; i < data.length; i++) {
        let a = await client.users.fetch(data[i].ID.split("_")[1])
        content += `${i+1}. **${a.tag}** - ${data[i].data.toLocaleString()} WL\n`
      }
    let embed = new MessageEmbed()
    .setAuthor("TOP 10 WORLD LOCK")
    .setDescription(content)
    .setColor(color)
    msg.channel.send(embed)
    }
    
    if(args[0] === "gems") {
    let dat = await db.all().filter(data => data.ID.startsWith(`gems`))
    dat = dat.sort((a, b) => b.data - a.data)
      
      dat.length = 10
      let c = "";
      
      for(let i = 0; i < dat.length; i++) {
        let a = await client.users.fetch(dat[i].ID.split("_")[1])

        c += `${i+1}. **${a.tag}** - ${dat[i].data.toLocaleString()}\n`
      }
      let embed = new MessageEmbed()
      .setAuthor("TOP 10 GEMS")
      .setDescription(c)
      .setColor(color)
      msg.channel.send(embed)
    }
    
   if(args[0] === "1796") {
      let dls = await db.all().filter(data => data.ID.startsWith(`dl`))
      dls = dls.sort((a, b) => b.data - a.data)
      
     dls.length = 10;
      let asw = '';
      
      for(let i = 0; i < dls.length; i++) {
        let user = client.users.cache.get(dls[i].ID.split('_')[1])
        
        asw += `${i+1}. **<@${dls[i].ID.split("_")[1]}>** - ${dls[i].data}\n`
      }
      
      let embed = new MessageEmbed()
      .setAuthor("TOP 10 DIAMOND LOCK")
      .setColor(color)
      .setDescription(asw)
      msg.channel.send(embed)
    }
    
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}