//onst { MessageEmbed } = require("discord.js")

module.exports = {
  name: "bfg",
  description: "random bfg",
  usage: "bfg",
  category: "growtopia",
  run: async(client, message, args) => {

    const db = require('quick.db')
const { prefix } = require("../../config.json")
const Discord = require('discord.js')
const ms = require("parse-ms");

    let pickaxe = db.get(`pickaxe_${message.author.id}`)
    if(pickaxe === null) pickaxe = false;
    
    if(pickaxe === false) {
      
    let user = message.author;
    let author = await db.fetch(`bfg_${user.id}`)

    let timeout = 1000000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.reply(`BFG are closed because no stock. Comeback at ${time.minutes}m ${time.seconds}s`)
      } else {

        let replies = ['Laser Grid', 'Chandelier', 'Pinball Bumper', 'Pepper Tree', 'Sorcerer Stone']

        let result = Math.floor((Math.random() * replies.length));
        let gems = Math.floor(Math.random() * 100) + 100;
       
        /*let embed1 = new Discord.RichEmbed()
        .setColor()
        .setDescription(`<:Check:618736570337591296> You worked as a ${replies[result]} and earned ${amount} coins`);*/
        message.reply(`Collected **${gems} from ${replies[result]}**`)
        
        db.add(`gems_${user.id}`, gems)
        db.set(`bfg_${user.id}`, Date.now())
    };
} 
    if(pickaxe === true) {
    let user = message.author;
    let author = await db.fetch(`bfg_${user.id}`)

    let timeout = 1000000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.channel.send(`BFG are closed because no stock. Comeback at **:** ${time.minutes}m ${time.seconds}s`)
      } else {

        let replies = ['Laser Grid', 'Chandelier', 'Pinball Bumper', 'Pepper Tree', 'Sorcerer Stone']

        let result = Math.floor((Math.random() * replies.length));
        let gems = Math.floor(Math.random() * 500) + 100;
       
        /*let embed1 = new Discord.RichEmbed()
        .setColor()
        .setDescription(`<:Check:618736570337591296> You worked as a ${replies[result]} and earned ${amount} coins`);*/
        message.reply(`You've got **${gems} Gems** from breaking **${replies[result]}**`)
        
        db.set(`bfg_${user.id}`, Date.now())
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