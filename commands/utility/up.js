const Discord = require("discord.js")
const c = require("../../config.json")
const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")

module.exports = {
  name: "up",
  category: "utility",
  description: "suggest for next bot update",
  usage: "suggestions <you suggestions>",
  aliases: ["suggest", "suggestion"],
  run: async(client, msg, args) => {

    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("You not have permission")
    
    msg.delete()
    
    let note = args.slice(0).join(" ");
    if(!note) {
		let x = new Discord.MessageEmbed()
		.setDescription('<:no:768994814527143986> **Please put the note.**')
		.setColor(c.color);
		return msg.channel.send(x)
    }
    
    let embed = new MessageEmbed()

   /* .setThumbnail(msg.author.displayAvatarURL())
    .addField("Author:", `\`\`\`Name: ${msg.author.username}\nDiscriminator: ${msg.author.discriminator}\nID: ${msg.author.id}\`\`\``)
    .addField("Guild:", `\`\`\`Name: ${msg.guild.name}\nOwner: ${msg.guild.owner.user.tag}\nID Guild: ${msg.guild.id}\`\`\``)
    .addField("Bug Report:", `\`\`\`${bug}\`\`\``)*/
    .setTitle('SERVER STATUS')
    .addField('📊 STATUS :', 'ONLINE/UP')
    .addField('📜 NOTE :', note)
    .addField('🎥 MENTION :', '@everyone')
    .setThumbnail('https://media.discordapp.net/attachments/620532799606095882/769149030382174228/SERVER_UP.gif?width=427&height=427')
    .setImage('https://media.discordapp.net/attachments/620532799606095882/769149595862564874/line.gif')
    .setTimestamp()
    .setFooter(`${msg.author.tag}`, `${msg.author.displayAvatarURL({ dynamic: true })}`)
    .setColor('#44b484')
    msg.channel.send(embed)
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}