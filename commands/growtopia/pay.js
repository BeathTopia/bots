const { add, subtract, fetch } = require("quick.db");
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "pay",
  usage: "/pay [gems | 242 ] <@user> <total you want pay>",
  category: "growtopia",
  description: "pay (only gems) to someone you mention",
  run: async(client, msg, args) => {
    
    if(!args[0]) return msg.channel.send(`${client.prefix[msg.guild.id]}pay [gems | 242 ] <@user> <amount>`)
    
    if(args[0] === 'gems') {
    let orng = msg.mentions.users.first()
    if(!orng) return msg.reply("Who you want to pay?")
    
    let gems = fetch(`gems_${msg.author.id}`)
    if(gems === null) gems = 0;
    
    if(orng.id === msg.author.id) return msg.reply("You can't pay your self")
    if(orng.id === client.user.id) return msg.reply("Oh no, you cant pay me :(")
    let total = args[2];
    if(!total) return msg.channel.send("You not put how much you want pay")
    
    if(isNaN(total)) {
      return msg.reply("Invalid total gems")
    }
  
    if(msg.content.includes('-')) {
      return msg.reply("You cant pay with negative gems")
    }
    
    if(gems < total) {
      return msg.reply(`Your gems is ${gems} gems and you cant pay ${total} gems to ${orng.tag}`)
    }
    
    msg.reply(`You pay ${total} gems to ${orng.tag}`)
    add(`gems_${orng.id}`, total)
    subtract(`gems_${msg.author.id}`, total)
    }
    
    if(args[0] === '242'){
      let user = msg.mentions.users.first()
      if(!user) return msg.reply(`Mention users first`)
      
      let wl = fetch(`wl_${msg.author.id}`)
      if(wl === null)wl = 0;
      
      if(user.id === msg.author.id) return msg.reply('Sorry you can\'t pay your self')
      if(user.id === client.user.id) return msg.reply(`Sorry you can't pay me :(`)
      
      let total = args[2];
      if(!total) return msg.reply(`You not put total world lock`)
      
      if(isNaN(total)) return msg.reply('Invalid number')
      
      if(wl < total) return msg.reply(`Your world lock is **${wl} world lock** you can't pay **${total} world lock**`)
      
      if(msg.content.includes('-')) return msg.reply('You can\'t pay with negative number')
      
      msg.reply(`You pay **${total} world lock** to **${user.tag}**`)
      
      add(`wl_${user.id}`, total)
      subtract(`wl_${msg.author.id}`, total)
    }
    
    
    
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}