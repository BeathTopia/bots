const db = require('quick.db')
const c = require("../../config.json")
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
  name: "science",
  category: "growtopia",
  description: "take your world lock!",
  usage: c.prefix + "science",
  run: async (bot, message, args) => {
    
    let science = db.get(`science_${message.author.id}`)
    if(science === null) science = false;
    if(science === false) return message.reply("You don't have **Science Station**, Type /shop to buy.")
    if(science === true) {
    let user = message.author
    let author = await db.fetch(`science-time_${user.id}`)

    let timeout = 1500000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:708002858313842758> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.channel.send(`You already take Chemicals back in **${time.minutes}m ${time.seconds}s**`)
      } else {

       // let replies = ['Programmer','Dokter','Pilot','Bos','Chef','Mechanic']

        //let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 350) + 1;
       
        /*let embed1 = new Discord.RichEmbed()
        .setColor()
        .setDescription(`:Check: You worked as a ${replies[result]} and earned ${amount} coins`);*/
        message.channel.send(`<:tor_science:781825558639018005> Harvested science stations, sold chemicals for **${amount} Gems** all.`)
        
       db.add(`gems_${user.id}`, amount)
       db.set(`science-time_${user.id}`, Date.now())
      }
    }
}

}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}