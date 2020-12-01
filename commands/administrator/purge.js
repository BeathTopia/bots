const Discord = require("discord.js")
const c = require("../../config.json"); 

module.exports = {
name: "purge",
category: "administrator",
description: "",
usage: "purge 1 - 100",
run: async(client, msg, args) => {

if(!msg.member.hasPermission("MANAGE_MESSAGES")) {
	let x = new Discord.MessageEmbed()
	.setDescription("<:no:768994814527143986> **You don't have permissions to use this commands**")
	.setColor(c.color);
	return msg.channel.send(x);
	}
  if(!msg.member.guild.me.hasPermission("MANAGE_MESSAGES")) {
	let y = new Discord.MessageEmbed()
	.setDescription("<:no:768994814527143986> **I don't have permissions to do that.**")
	.setColor(c.color);
	return msg.channel.send(y);
	}
  
  if(isNaN(args[0])) {
	  let g = new Discord.MessageEmbed()
	  .setDescription("<:no:768994814527143986> **Specify how many messages you want to delete.**")
	  .setColor(c.color);
	  return msg.channel.send(g);
	  }
  
  if(args[0] > 100) {
  let b = new Discord.MessageEmbed()
  .setDescription("<:no:768994814527143986> **You can only delete 100 messages at once.**")
  .setColor(c.color)
  return msg.channel.send(b)
  }
  
  if(args[0] < 1) {
  let j = new Discord.MessageEmbed()
  .setDescription("<:no:768994814527143986> **You only can use with numbers 1-100.**")
  .setColor(c.color)
  return msg.channel.send(j)
  }
  
        if(!args[0]) {
	          let z = new Discord.MessageEmbed()
	          .setDescription("<:no:768994814527143986> **Specify how many messages you want to delete.**")
	          .setColor(c.color);
	          return msg.channel.send(z);
	          }
  
  
  let k = new Discord.MessageEmbed()
  .setDescription(`<:yes:768994800715563028> **You have successfully deleted ${args[0]} messages**`)
  .setColor('#44b484')

  let n = new Discord.MessageEmbed()
  .setDescription("<:no:768994814527143986> **You can only delete 100 messages at once.**")
  .setColor(c.color)
  
        msg.delete();
        msg.channel.bulkDelete(args[0]).catch(e => { msg.channel.send(n)});
        msg.channel.send(k).then(m => m.delete({ timeout: 5000 }));
}
}

module.exports.requirements = {
ownerOnly: false,
userPerms: [],
clientPerms: []
}