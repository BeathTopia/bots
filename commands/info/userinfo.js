const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json");
const db = require("quick.db");

module.exports = {
  name: "userinfo",
  aliases: ["user-info"],
  category: "info",
  description: "check user information",
  usage: "userinfo [@user]",
  run: async(client, msg, args) => {
    
    let org = msg.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null)
    if(!org) {
      org = msg.author
    }
    let member = org.member;
    //==================={ ITEM } =======================
    let wl = db.fetch(`wl_${org.id}`)
    if(wl === null) wl = 0;
    
    let dl = db.fetch(`dl_${org.id}`)
    if(dl === null) dl = 0;
    
    let gems = db.fetch(`dl_${org.id}`)
    if(gems === null) gems = 0;
    
    let cx = db.get(`pickaxe_${org.id}`)
    if(cx === null) cx = false;
    if(cx === false) cx = "Dont Have";
    if(cx === true) cx = "Have";
    //====================================================
    
    let server = msg.guild
    
    let embed = new MessageEmbed()
    .setAuthor(`${org.username} Info`, msg.author.displayAvatarURL())
    .setThumbnail(org.displayAvatarURL())
    .addField("Name:", org.username)
    .addField("Discriminator:", org.discriminator)
    .addField("ID:", org.id)
    .addField("Status:", org.presence.status)
    .addField("Growtopia items", `\`\`\`World lock: ${wl} World lock\nDiamond Lock: ${dl} Diamond Lock\nGems: ${gems} Gems\nPickaxe: ${cx}\`\`\``)
    .addField("Discord Game:", org.presence.game ? org.persence.game: "None")
    .addField("Created At:", org.createdAt)
    .setFooter("Information about: " + org.tag)
    .setTimestamp()
    .setColor(color)
    
    msg.channel.send(embed)
    }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}