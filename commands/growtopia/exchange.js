const { MessageEmbed } = require("discord.js")
const { get, fetch , add, subtract } = require("quick.db");
const { color } = require("../../config.json")

module.exports = {
  name: "exchange",
  aliases: "change",
  description: "exchange your dl/wl/gems",
  usage: "exchange <id>-<id>",
  category: "growtopia",
  run: async(client, msg, args) => {
    
    let embed = new MessageEmbed()
    .setAuthor("Torions Exchange", client.user.displayAvatarURL())
    .setTimestamp()
    .addField("<:tor_wl:768876217151520791> World Locks <> <:tor_dl:768876230786416640> Diamond Locks", "**Usage:** t!exchange <wl id> <dl id> <amount>\n**Example:** t!exchange 242 1796 100")
    .addField("<:tor_dl:768876230786416640> Diamond Locks <> <:tor_wl:768876217151520791> World Locks", "**Usage:** t!exchange <dl id> <wl id> <amount>\n**Example:** t!exchange 1796 242 1")
    .setColor("#FC0000")
    .setFooter("Read Usage and Example")
    .setTimestamp()
    
    if(!args[0]) return msg.channel.send(embed)
  
    if(args[0] === "1796") {
      
      if(!args[1]) return msg.reply(`example: ${client.prefix[msg.author.id]}exchange 1796 242 <total amoun you want to exchange from diamond lock to world lock`)
      //============( WORLD LOCK )===========
      if(args[1] === "242") {
      let wl = fetch(`wl_${msg.author.id}`);
      if(wl === null) wl = 0;
      
      let dl = fetch(`dl_${msg.author.id}`);
      if(dl === null) dl = 0;
      
      let jumlah = args[2];
      if(!jumlah) return msg.reply("You not specify amount you want to exchange")
      
      if(msg.content.includes('-')) {
        return msg.reply("You cant exchange with negative amount")
      }
      
      
      if(isNaN(jumlah)) {
        return msg.reply("Its invalid amount")
      }
      
      if(dl < jumlah) {
        return msg.reply("You not have that much diamond lock in your balance")
      }
      
      msg.reply("Succefully, you exchange Diamond Lock to World lock")
      add(`wl_${msg.author.id}`, jumlah * 100)
      subtract(`dl_${msg.author.id}`, jumlah)
    }//============={ END OF WORLD LOCK } =============
      
    }
    
    if(args[0] === "242") {
      if(!args[1]) return msg.reply(`example: ${client.prefix[msg.guild.id]}exchange 242 1796 <total amount you want exchange from World lock to Diamond lock`)
      
      //========================={ DIAMOND LOCK }============
      if(args[1] === "1796") {
      let wl = fetch(`wl_${msg.author.id}`)
      if(wl === null) wl = 0;
      
      let dl = fetch(`dl_${msg.author.id}`)
      if(dl === null) dl = 0;
      
      let jumlah = args[2]
      if(!jumlah) return msg.reply("You not specify amount you want to exchange")
      
     if(msg.content.includes('-')) {
       return msg.reply("You cant exchange with negative amount")
     }
      
      if(isNaN(jumlah)) {
        return msg.reply("Its invalid amount")
      }
      
      if(wl < jumlah) {
        return msg.reply("You not have that much in your balance")
      }
      
     if(jumlah < 100) {
        return msg.reply("Min 100 world lock")
      }
      
      msg.reply(`Succefully, you exchange ${jumlah} world lock to ${jumlah / 100}`)
        add(`dl_${msg.author.id}`, jumlah / 100)
        subtract(`wl_${msg.author.id}`, jumlah)
    }//======================{ END OF DIAMOND LOCK }================
    }
    
   /* if(args[0] === "98") {
      if(!args[1]) return msg.reply(`ex: ${client.prefix[msg.guild.id]}exchange 98 <242 | 1796> <amount>`)
      
      //================{ GEMS TO WORLD LOCK }===========
      if(args[1] === "242") {
        let wl = fetch(`wl_${msg.author.id}`)
        if(wl === null) wl = 0;
        
        let gems = fetch(`gems_${msg.author.id}`)
        if(gems === null) gems = 0;
        
        let total = args[2];
        if(!total) return msg.reply("You not specify total gems you want to exchange")
        
        if(msg.content.includes('-')) {
          return msg.reply("You cant exchange with negative amount")
        }
        
        if(isNaN(total)) {
          return msg.reply("Its Invalid amount")
        }
        
        if(gems < total) {
          return msg.reply("You not hage that much gems")
        }
        
        if(total < 2000) {
          return msg.reply("Min 2000 gems")
        }
        
        msg.reply(`Succesfully, you exchange ${total} gems to ${
        
      }
      
    }*/
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}