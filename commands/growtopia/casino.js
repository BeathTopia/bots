const db = require('quick.db')
const c = require("../../config.json")
const Discord = require('discord.js')
const { color } = require("../../config.json")
const ms = require("parse-ms");

module.exports = {
  name: "casino",
  category: "growtopia",
  description: "take your world lock!",
  usage: c.prefix + "casino",
  run: async (bot, message, args) => {
    
    let pesan = args.slice(0).join(' ')
    if(!pesan) return message.reply("Please input the names that's you want to battle with you.")
    let user = message.author;
    let author = await db.fetch(`casino_${user.id}`)

    let timeout = 180000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        /*let timeEmbed = new Discord.RichEmbed()
        .setColor("black")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s*/
      message.channel.send(`${message.author}, Please wait **${time.minutes} minutes ${time.seconds} seconds** before using this commands`)
      } else {

        let random = ["win", "lose", "win", "win", "lose", "lose", "lose", "lose", "win", "lose", "lose", "win"]
        let random1 = Math.floor(Math.random() * random.length);
        let random2 = random[random1];
        let amount = Math.floor(Math.random() * 50) + 45;
        
        switch(random2){
          case "win":
        let embed = new Discord.MessageEmbed()
        .setTitle('<:tor_roulette:783238859978833920> Casino Battle!')
        .setColor("#27FF00")
        .setDescription(`${message.author} **won** the casino battle against **${pesan}** and got their **${amount} gems.**`)
        message.channel.send(embed)
        
        db.add(`gems_${user.id}`, amount)
        db.set(`casino_${user.id}`, Date.now())
            break;
          case "lose":
            db.subtract(`gems_${user.id}`, amount)
            let embeds = new Discord.MessageEmbed()
            .setTitle('<:tor_roulette:783238859978833920> Casino Battle!')
            .setColor(color)
            .setDescription(`${message.author} **lost** the casino battle against **${pesan}** and they got your **${amount} gems.**`)
            return message.channel.send(embeds)
            break;
        }
        
      }
    }
}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}