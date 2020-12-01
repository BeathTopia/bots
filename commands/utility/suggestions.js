const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")

module.exports = {
  name: "suggestions",
  category: "utility",
  description: "suggest for next bot update",
  usage: "suggestions <you suggestions>",
  aliases: ["suggest", "suggestion"],
  run: async(client, msg, args) => {
    
    let ch = client.channels.cache.get("768991984492740628")
    
    let suggest = args.slice(0).join(" ");
    if(!suggest) return msg.reply("Please put your suggestions")
    
    let embed = new MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true}))

   /* .setThumbnail(msg.author.displayAvatarURL())
    .addField("Author:", `\`\`\`Name: ${msg.author.username}\nDiscriminator: ${msg.author.discriminator}\nID: ${msg.author.id}\`\`\``)
    .addField("Guild:", `\`\`\`Name: ${msg.guild.name}\nOwner: ${msg.guild.owner.user.tag}\nID Guild: ${msg.guild.id}\`\`\``)
    .addField("Bug Report:", `\`\`\`${bug}\`\`\``)*/
    .setDescription(suggest)
    .setColor(color)
    .setFooter(`Suggestion from ${msg.author.tag}`)
    .setTimestamp()
    ch.send(embed)
    msg.reply("Your suggestions has been send to moderator or staff")
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}