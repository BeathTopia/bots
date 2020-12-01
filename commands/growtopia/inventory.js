const { MessageEmbed } = require("discord.js");
const { get, fetch } = require("quick.db");
const { color } = require("../../config.json");

module.exports = {
  name: "inventory",
  aliases: ["bal", "balance"],
  category: "growtopia",
  description: "check inventory",
  usage: "inventory [@user]",
  run: async(client, msg, args) => {
    
    let orang = msg.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null)
    if(!args[0]) orang = msg.author;

    let orangs = msg.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null)
    if(!args[0]) orangs = msg.author.tag;
    
    //==================={ DATABASE ITEMS } ================
    let wl = fetch(`wl_${orang.id}`)
    if(wl === null) wl = 0;
    
    let dl = fetch(`dl_${orang.id}`)
    if(dl === null) dl = 0;
    
    let gems = fetch(`gems_${orang.id}`)
    if(gems === null) gems = 0;
    
    let pickaxe = get(`pickaxe_${orang.id}`)
    if(pickaxe === null) pickaxe = false;
    if(pickaxe === false) pickaxe = "";
    if(pickaxe === true) pickaxe = `:pick: **Pickaxe**`;
    
    let vend = get(`vend_${orang.id}`)
    if(vend === null) vend = false;
    if(vend === false) vend = '';
    if(vend === true) vend = `<:tor_vend:779398680284495962> **Vending Manchine**`;

    let science = get(`science_${orang.id}`)
    if(science === null) science = false;
    if(science === false) science = '';
    if(science === true) science = `<:tor_science:781825558639018005> **Science Station**`;
    
    let g = fetch(`daily_${orang.id}`)
    if(g === null) g = 0;
    if(g > 0) g = ":white_check_mark: Taked Daily";
    if(g < 0) g = "Take your daily reward";
    
    let orion = get(`orion_${orang.id}`)
    if(orion === true) orion = `<:tor_mafia:779399634522079263> **Bundle Mafia Set**`;
    if(orion === null) orion = false;
    if(orion === false) orion = ''
    
    
    let atm = fetch(`deposit_${orang.id}`)
    if(atm === null) atm = 0;
    //==========================={ END OF DATABASE } ==============
    
    //==========================={ EMBED }================
    let embed = new MessageEmbed()
    .setAuthor(`${orang.username}'s Inventory`)
    .setColor("RANDOM")
    .setThumbnail(orang.displayAvatarURL({dynamic:true, size: 4096}))
    .setDescription(`
<:tor_worldlock:781546722387165225> **World Lock:** ${wl} WL
<:tor_diamondlock:781545885414326274> **Diamond Lock:** ${dl} DL
<:tor_gems:781546722601467904> **Gems:** ${gems} Gems
<:tor_atm:781552896709492771> **ATM:** ${atm} Gems`)
/***Daily bonus**
${g}`)*/
    .addField("Items Owned\n\n", `${pickaxe}\n${vend}\n${science}\n${orion}`)
    msg.channel.send(embed)
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}