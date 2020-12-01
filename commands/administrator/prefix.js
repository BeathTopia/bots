const Discord = require("discord.js")
const c = require("../../config.json") 

module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  usage: "prefix <new prefix>",
  category: "administrator",
  description: "change prefix in your guild",
  run: async(client, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You don't have permissions**")
    
    let pref = args[0];
    if(!pref) {
		let x = new Discord.MessageEmbed()
		.setDescription('<:no:768994814527143986> **Please put new prefix!**')
		.setColor(c.color);
		message.channel.send(x)
	}
    const prefix = pref.toLowerCase();
    
    const y = new Discord.MessageEmbed()
    .setDescription(`<:yes:768994800715563028> **Now my prefix is ${prefix}**`)
    .setColor('#44b484')
    
    await client.db.set(`prefix-${message.guild.id}`, prefix)
    client.prefix[message.guild.id] = prefix;
    
    message.channel.send(y)
    
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}