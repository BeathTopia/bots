const Discord = require("discord.js")

module.exports = {
  name: "mute",
  aliases: ["m"],
  description: "Mute members",
  category: "administrator",
  usage: "mute <@users> [reason]",
  run: async (client, message, args) => {
 // if(!["580640622235484161", "297130271864520705"].includes(message.author.id)) return;
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You need permission KICK_MEMBER")
  if(!message.member.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("I cant mute that user, give me KICK_MEMBER")
  
  let a = message.mentions.users.first()
  let reason = args.slice(1).join(" ")
  
  if(!a) return message.reply("who want to you mute?")
  if(a.id === message.author.id) return message.reply("You cant mute your self")
  //if(!reason) return message.reply("?")
 
  /*
  let anj = db.get("botlist")
  let own = anj.indexOf(anj.filter(x => x.id === a.id)[0])
  let owner = db.get(`botlist.${own}.owner`)
  if(!owner) {
    owner = a.id
  }*/
  
 // let logs = client.channels.cache.get("702206346879041596")
  let g = client.guilds.cache.get(message.guild.id)
  
  let user = g.members.cache.get(a.id)
  let role = g.roles.cache.find(r => r.name === "Muted")
  if (!role) {
    try {
      role = await message.guild.roles.create({
        data: {
          name: "Muted",
          permissions: []
        }
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.createOverwrite(role, {
          SEND_MESSAGES: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false
        })
      })
    } catch(e) {
      console.log(e.stack)
    }
  }
  user.roles.add(role.id)
  
  message.channel.send(`${message.author} you succesfully mute ${a.tag}`)

  }
}

module.exports.requirements = {
  ownerOnly: false,
  usersPerms: [],
  clientPerms: ["KICK_MEMBERS"]
}