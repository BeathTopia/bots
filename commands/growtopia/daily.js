const db = require('quick.db')
const c = require("../../config.json")
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
  name: "daily",
  category: "growtopia",
  description: "get daily gems",
  usage: c.prefix + "daily",
  run: async (bot, message, args) => {
    
    let user = message.author;
    let author = await db.fetch(`daily_${user.id}`)

    let timeout = 86400000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.channel.send(`You already take daily bonus back in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
      } else {

       // let replies = ['Programmer','Dokter','Pilot','Bos','Chef','Mechanic']

        //let result  Math.floor((Math.random() * replies.length));
        let amount = 5000;//Math.floor(Math.random() * 12) + 1;
       
        /*let embed1 = new Discord.RichEmbed()
        .setColor()
        .setDescription(`<:Check:618736570337591296> You worked as a ${replies[result]} and earned ${amount} coins`);*/
        message.channel.send(`You take a daily bonus and get **${amount} gems**`)
        
        db.add(`gems_${user.id}`, amount)
        db.set(`daily_${user.id}`, Date.now())
      }
    }
}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}