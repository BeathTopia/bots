const Discord = require("discord.js");
const { color, prefix} = require("../../config.json")

module.exports = {
  name: "nuke",
  description: "nuke channel",
  usage: prefix + "nuke",
  category: "administrator",
  run: async(client, message, args) => {
    
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have permission");
  if (!message.guild.member(client.user).hasPermission('MANAGE_CHANNELS')) {
	let x = new Discord.MessageEmbed()
    .setDescription("<:no:768994814527143986> **I don't have permissions to do that!**")
	message.channel.send(x)
  }
  await message.channel.clone().then(clone => {
  clone.edit({ parent: message.channel.parent.id, position: message.channel.position });
  message.channel.delete();
    
  const embed = new Discord.MessageEmbed()  
  .setTitle('Channel Nuked!')
  .setColor(color)
 clone.send(embed)
    
  }); 

  }

}
 
module.exports.requirements = {
ownerOnly: false,
userPerms: [],
clientPerms: ["MANAGE_CHANNELS"],
}