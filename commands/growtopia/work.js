const db = require('quick.db')
const { prefix } = require("../../config.json")
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
  name: "work",
  category: "growtopia",
  description: "work to get wl",
  usage: prefix + "work",
  run: async (bot, message, args) => {
    let pickaxe = db.get(`pickaxe_${message.author.id}`)
    if(pickaxe === null) pickaxe = false;
    
    if(pickaxe === false) {
      
    let user = message.author;
    let author = await db.fetch(`work_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.reply(`You already work back in: ${time.minutes}m ${time.seconds}s`)
      } else {

        let replies = ['Clear world', 'Put block', 'Break block', 'Sell world']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 4) + 1;
        let gems = Math.floor(Math.random() * 50) + 45;
       
        /*let embed1 = new Discord.RichEmbed()
        .setColor()
        .setDescription(`<:Check:618736570337591296> You worked as a ${replies[result]} and earned ${amount} coins`);*/
        message.reply(`You worked a **${replies[result]}** and earned **${amount} World Lock** and **${gems} Gems**`)
        
        db.add(`gems_${user.id}`, gems)
        db.add(`wl_${user.id}`, amount)
        db.set(`work_${user.id}`, Date.now())
    };
} 
    if(pickaxe === true) {
    let user = message.author;
    let author = await db.fetch(`work_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.channel.send(`You already work\nback in: ${time.minutes}m ${time.seconds}s`)
      } else {

        let replies = ['Clear World', 'Put block', 'Break block', 'Sell world']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 8) + 1;
        let gems = Math.floor(Math.random() * 350) + 1;
       
        /*let embed1 = new Discord.RichEmbed()
        .setColor()
        .setDescription(`<:Check:618736570337591296> You worked as a ${replies[result]} and earned ${amount} coins`);*/
        message.reply(`You worked a **${replies[result]}** and earned **${amount} world lock** and get **${gems} gems**`)
        
        db.add(`wl_${user.id}`, amount)
        db.set(`work_${user.id}`, Date.now())
        db.add(`gems_${user.id}`, gems)
    }
  }
  }
}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}