const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json")

module.exports = {
  name: "changelog",
  aliases: ["ch", "change-log"],
  description: "checking new update commands",
  usage: "changelog",
  category: "utility",
  run: async(client, msg, args) => {
    
    let embed = new MessageEmbed()
    .setAuthor(`${client.user.username} New`, msg.author.displayAvatarURL())
    .setDescription(`**New Updates**
\`\`\`
• Revomed leveling system
\`\`\`
**Update of the week**
\`\`\`
• - \`\`\``)
    .setColor(color)
    .setFooter("Last update: 19-06-2020 07:46 GMT+0007")
    
    msg.channel.send(embed)
    
  }
}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}