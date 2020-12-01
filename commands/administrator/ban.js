const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const c = require("../../config.json"); 

module.exports = {
  name: "ban",
  description: "banned member",
  category: "administrator",
  usage: config.prefix + "ban <@user> [reason]",
  run: async (client, message, args) => {
    
   // if(!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== "648070702120960012") return message.channel.send("Sorry you don't have permission to use this!");

        let member = message.mentions.members.first();
        let user = member.user;
        if(!member) return message.channel.send(`Missing usage\nUsage: ${config.prefix}ban <@user> [reason]`)
        if(!member.bannable) {
	          let x = new Discord.MessageEmbed()
	          .setDescription('<:no:768994814527143986> **I cannot ban someone that is mod/admin.**')
	          .setColor(c.color);
	          return message.channel.send(x)
        }
        if(member.user.id === "648070702120960012") return message.channel.send("I can't ban my owner!")

        if(member.id === message.author.id) {
	          let y = new Discord.MessageEmbed()
	          .setDescription("<:no:768994814527143986> **You can't ban your self.**")
	          .setColor(c.color);
	          return message.channel.send(y)
        }

        let reason = args.slice(1).join(" ");
    
        await member.ban(reason).catch(error => message.channel.send(`Sorry, I coldn't ban because of: ${error}`));
    
        let bean = new Discord.MessageEmbed()
        .setTitle(`Ban | ${user.tag}`)
        .setThumbnail(user.displayAvatarURL())
        .setColor(config.color)
        .addField("User:", `${user} (${user.tag})`)
        .addField("Moderator:", `${message.author} (${message.author.tag})`)
        .addField("Reason:", `${reason ? reason: "No reason"}`)
        .setFooter(`${message.author.tag} banned ${user.tag}`)

        message.channel.send(bean)

        message.delete()
  }
};
 
module.exports.requirements = {
  ownerOnly: false,
  userPerms: ["BAN_MEMBERS"],
  clientPerms: ["BAN_MEMBERS"]
}