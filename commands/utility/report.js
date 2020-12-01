const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")

module.exports = {
  name: "report",
  category: "utility",
  description: "report bug",
  usage: "report <bug>",
  aliases: ["report-bug", "bug"],
  run: async(client, msg, args) => {
    
    let ch = client.channels.cache.get("713214233067651102")
    
    let bug = args.slice(0).join(" ");
    if(!bug) return msg.reply("Please put your bug")
    
    let embed = new MessageEmbed()
    .setAuthor("Report Bug", msg.guild.iconURL())
    .setThumbnail(msg.author.displayAvatarURL())
    .addField("Author:", `\`\`\`Name: ${msg.author.username}\nDiscriminator: ${msg.author.discriminator}\nID: ${msg.author.id}\`\`\``)
    .addField("Guild:", `\`\`\`Name: ${msg.guild.name}\nOwner: ${msg.guild.owner.user.tag}\nID Guild: ${msg.guild.id}\`\`\``)
    .addField("Bug Report:", `\`\`\`${bug}\`\`\``)
    .setColor(color)
    .setFooter(`Report bug from ${msg.author.tag} in ${msg.guild.name}`)
    .setTimestamp()
    ch.send(embed)
    msg.reply("Your report has been send to moderator or staff")
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}