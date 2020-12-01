const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')

module.exports = {
  name: 'rob',
  descripiton: 'Rob to someone',
  usage: 'rob [@user]',
  category: 'growtopia',
  run: async(client, msg, args) => {
    
    let timeout = 360000
    let author = db.fetch(`rob_${msg.author.id}`)
    
    if(author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author))
      
      msg.reply('You already rob back in: '+`${time.minutes}m ${time.seconds}s`)
    }else{
      let mention = msg.mentions.users.first()
      if(!mention) return msg.reply('Who you want rob?')
      
      let gems = db.get(`gems_${mention.id}`)
      if(gems < 1) return msg.reply(`**${mention.tag}** no have money for rob`)
      if(gems === null) gems = 0;
      
      let random = Math.floor(Math.random() * 1000)+1;
      
      if(gems < 1000) {
        return msg.channel.send(`**${mention.tag}** must have 1000 gems or more`);
      }
      
      msg.channel.send(`**${msg.author.tag}** You rob **${mention.tag}** and get **${random} gems**`)
      db.set(`rob_${msg.author.id}`, Date.now())
      db.subtract(`gems_${mention.id}`, random)
      db.add(`gems_${msg.author.id}`, random)
      
    }
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms:[],
  clientPerms:[]
}