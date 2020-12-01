const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { prefix, color } = require("../../config.json")
const tble = require("ascii-table")

module.exports = {
  name: "shop",
  aliases: ["store"],
  description: `check list item growtopia, type ${prefix}buy <id item> <total>`,
  usage: `${prefix}shop`,
  category: "growtopia",
  run: async(client, msg, args) => {
    
    let dl = "768875371520852008";
    let wl = "768876217151520791";
    let gems = "725000987886223360";
    let vend = "725160172007325777";
    
    let orion = '779399634522079263';
    
    let embed = new MessageEmbed()
    .setAuthor("Official Torions Store", client.user.displayAvatarURL())
    //.setThumbnail(msg.author.displayAvatarURL())
    .setColor(color)
    .setFooter("Example: t!buy <Items ID> <Amount Items>")
    .setTimestamp()
    .addField("<:tor_wl:768876217151520791> Worlds Locks :", "ID: 242\nPrice: 2,000 Gems")
    .addField(":pick: Pickaxe :", "ID: 98\nPrice: 50 World Locks")
    .addField("<:tor_vend:779398680284495962> Vending Machine :", "ID: 3\nPrice: 4 Diamond Locks")
    .addField("<:tor_science:781825558639018005> Science Station :", "ID: 2\nPrice: 30,000 Gems")
    .addField("<:tor_mafia:779399634522079263> Bundle Mafia Set :", "ID: 1\nPrice: 200,000 Gems")
    //.setDescription(`**Type ${client.prefix[msg.guild.id]}buy <item id> <amout you want buy>\nexample: ${client.prefix[msg.guild.id]}buy 1796 1**`)
    //.addField("Items", `\`\`\`Name: Diamond lock\nID: 1796\nPrice: 100 World Lock\n\nName: World Lock\nID: 242\nPrice: 2000 Gems\n\nName: Pickaxe\nID: 98\nPrice: 15 World lock\nProfit: can get extra gems and wl in some commands\`\`\``)
msg.channel.send(embed)
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}