const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json")

module.exports = {
  name: 'give',
  aliases: ["add-role"],
  usage: "give <@user>",
  category: "developer",
  description: "adding moderatorr & staff bot",
  run: async(client, message, args) => {
    
    let ch = client.channels.cache.get("713480509648273489")
    
    let guild = client.guilds.cache.get("713203429744443475")
    
    if(!args[0]) return message.reply(`Usage: ${client.prefix[message.guild.id]}give <mod | co-owner>`)
    
    if(args[0] === "mod") {
    let role = guild.roles.cache.find(role => role.name === "Moderator")
    
    let users = message.mentions.users.first() || await client.users.fetch(args[1]).catch(() => null);
    if(!users) return message.reply("Mention member who want you add to moderator")
    let user = guild.members.cache.get(users.id)
    //if(users.id === "580640622235484161") return message.channel.send("dam you cant add it to your self")
  
   /* let reason = args.slice(1).join(" ")
    if(!reason) return message.reply("Are you dump? want banned user without reason, give me reason!")
    */
    if(client.moderator.includes(users.id)) {
      message.reply(`**${users.tag} is arleady to be moderator**`)
    }else{
        client.moderator.push(users.id);
      message.channel.send(`${message.author} add ${users} to moderator`)
      
      let embed = new MessageEmbed()
      .setDescription(`[SYSTEM]: **${message.author.tag}** give mod to **${users.tag}**`)
      .setColor(color)
      ch.send(embed)//[SYSTEM]: **${message.author.tag}** give mod to **${users.tag}**`)
      
    user.roles.add(role.id)
    }
  await client.db.set("moderator", client.moderator)
    }
    
    if(args[0] === "co") {
      let role = guild.roles.cache.find(r => r.name === "Co owner")
      
      let users = message.mentions.users.first() || await client.users.fetch(args[1]).catch(() => null);
      if(!users) return message.reply("Mention or give id users if you want he be co-owner")
      let user = guild.members.cache.get(users.id)
      
      if(client.staff.includes(users.id)) {
        message.reply(`${users.tag} Is arleady Co-owner`)
      }else{
        client.staff.push(users.id);
        message.channel.send(`${message.author.tag} has promote ${users} to **Co-owner**`)
        
        let embed = new MessageEmbed()
        .setDescription(`[SYSTEM]: **${message.author.tag}** give co-owner to **${users.tag}**`)
        .setColor(color)
        ch.send(embed)//`[SYSTEM]: **${message.author.tag}** give Co-owner to **${users.tag}**`)
        
        user.roles.add(role.id)
      }
      await client.db.set("staff", client.staff)
    }
    }
}
module.exports.requirements = {
  ownerOnly: true,
  userPerms: [],
  clientPerms: []
}