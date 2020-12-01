const db = require('quick.db')
const c = require("../../config.json")
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
  name: "vend",
  category: "growtopia",
  description: "take your world lock!",
  usage: c.prefix + "vend",
  run: async (bot, message, args) => {
    
    let vend = db.get(`vend_${message.author.id}`)
    if(vend === null) vend = false;
    if(vend === false) return message.reply("Sadly, you must have **Vending Machine** before using this commands.")
    if(vend === true) {
    let user = message.author;
    let author = await db.fetch(`vending_${user.id}`)

    let timeout = 1500000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.channel.send(`You already take vending manchine back in **${time.minutes}m ${time.seconds}s**`)
      } else {

       // let replies = ['Programmer','Dokter','Pilot','Bos','Chef','Mechanic']

        //let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 50) + 10;
       
        /*let embed1 = new Discord.RichEmbed()
        .setColor()
        .setDescription(`<:Check:618736570337591296> You worked as a ${replies[result]} and earned ${amount} coins`);*/
        message.channel.send(`Collected **${amount} WL** from your worlds.`)
        
        db.add(`wl_${user.id}`, amount)
        db.set(`vending_${user.id}`, Date.now())
      }
    }
}

}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}