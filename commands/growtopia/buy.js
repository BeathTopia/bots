const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "buy",
  category: "growtopia",
  description: "buy item in growtopians bot",
  usage: "buy <item> <total item you want buy",
  run: async(client, msg, args) => {
    
    if(!args[0]) {
      let x = new MessageEmbed()
      .setDescription("<:no:768994814527143986> **Please type t!shop to see the list of the items/currency.**")
      .setColor("#FC0000")
      return msg.reply(x)
    }
    
    
    if(args[0] === '1') {
      let gems = db.fetch(`gems_${msg.author.id}`)
      if(gems === null) gems = 0;
      
      let orion = db.get(`orion_${msg.author.id}`)
      if(orion === null) orion = false;
      if(orion === true) {
        let x = new MessageEmbed()
        .setDescription("<:no:768994814527143986> **You already bought this items!**")
        .setColor("#FC0000")
        return msg.reply(x)
      }
      if(orion === false) {
        let harga = 200000;
        
        if(gems < harga) {
          let y = new MessageEmbed()
          .setDescription("<:no:768994814527143986> **You don't have gems to bought this items!**")
          .setColor("#FC0000")
          return msg.reply(y)
        }
        
        msg.reply(`You have been successfully! buyed **Bundle Mafia Set** for 200,000 Gems`)
        db.subtract(`gems_${msg.author.id}`, harga)
        db.set(`orion_${msg.author.id}`, true)
      }
    }
    
    
    
    if(args[0] === "242") {
      
      let gems = db.fetch(`gems_${msg.author.id}`)
      if(gems === null) gems = 0;
      
      let asw = 2000;
      
      let total = args[1];
      if(!total) {
        let x = new MessageEmbed()
        .setDescription("<:no:768994814527143986> **Input total you want to buy World Locks!**")
        .setColor("#FC0000")
        return msg.reply(x)
      }
      
      if(gems < asw * total) {
        let r = new MessageEmbed()
        .setDescription(`<:no:768994814527143986> **You need ${asw * total - gems} Gems to buy ${total} World Lock**`)
        .setColor("#FC0000")
        return msg.reply(r)
      }
      
      if(isNaN(total)) {
        let y = new MessageEmbed()
        .setDescription("<:no:768994814527143986> **Invalid Messages, Please input the number!**")
        .setColor("#FC0000")
        return msg.reply(y)
      }
      
      if(msg.content.includes('-')) {
        let z = new MessageEmbed()
        .setDescription("<:no:768994814527143986> **You cannot buy World Locks with negative number**")
        .setColor("#FC0000")
        return msg.reply(z);
      }
      
     /* if(gems < asw) {
        return msg.reply(`You have **${gems} gems** and you need **${asw * total - gems} more gems** for buy **${total} World Lock**`)
      }*/
      
      msg.reply(`You has been buy **${total}** World Lock for **${asw * total}** Gems`)
      db.subtract(`gems_${msg.author.id}`, asw * total)
      db.add(`wl_${msg.author.id}`, total)
    }

    if(args[0] === "2") {
      let gems = db.fetch(`gems_${msg.author.id}`)
      let science = db.get(`science_${msg.author.id}`)
      
      if(science === true) return msg.reply("You already buy science")
      
      if(science === null) science = false;
      if(science === false) {
        let harga = 30000;
        
        if(gems < harga) return msg.reply(`You need **${harga - gems} Diamond lock** more for buy science`)
        
        msg.reply(`You buy **Science Station** and pay **${harga} Diamond lock**`)
        db.subtract(`gems_${msg.author.id}`, harga)
        db.set(`science_${msg.author.id}`, true)
      }
    }
    
    if(args[0] === "1796") {
      
      let wl = db.fetch(`wl_${msg.author.id}`);
      if(wl === null) wl = 0;
      
      let asw = 100;
      
      let total = args[1];
      if(!total) {
        let x = new MessageEmbed()
        .setDescription("<:no:768994814527143986> **Input total you want to buy Diamond Locks!**")
        .setColor("#FC0000")
        return msg.reply(x)
      }
      
      if(wl < asw * total) {
        return msg.reply(`You need ${asw * total - wl} world lock for buy ${total} Diamond Lock`)
      }
      
      if(msg.content.includes('-')) {
        let z = new MessageEmbed()
        .setDescription("<:no:768994814527143986> **You cannot buy Diamond Locks with negative number**")
        .setColor("#FC0000")
        return msg.reply(z);
      }
      
      if(isNaN(total)) {
        let y = new MessageEmbed()
        .setDescription("<:no:768994814527143986> **Invalid Messages, Please input the number!**")
        .setColor("#FC0000")
        return msg.reply(y)
      }
      
      msg.reply(`You has been buy ${total} Diamond Lock for ${asw * total} Gems`)
      db.add(`dl_${msg.author.id}`, total)
      db.subtract(`wl_${msg.author.id}`, asw * total)
    }
    
    if(args[0] === "98") {
      let wl = db.fetch(`wl_${msg.author.id}`)
      let pickaxe = db.get(`pickaxe_${msg.author.id}`)
      if(pickaxe === true) return msg.reply(`You already buy pickaxe`)
      if(pickaxe === null) pickaxe = false;
      if(pickaxe === false) {
      if(wl === null) wl = 0;
      
      let harga = 50;
      
      if(wl < harga) {
        return msg.reply(`You need **${harga - wl} World lock** more for buy pickaxe`)
      }
      
      msg.reply(`You buy pickaxe and pay **50 World lock**`)
      db.subtract(`wl_${msg.author.id}`, harga)
      db.set(`pickaxe_${msg.author.id}`, true)
    }
    }
    
    if(args[0] === "3") {
      let dl = db.fetch(`dl_${msg.author.id}`)
      let vend = db.get(`vend_${msg.author.id}`)
      
      if(vend === true) return msg.reply("You already buy vending machine")
      
      if(vend === null) vend = false;
      if(vend === false) {
        let harga = 4;
        
        if(dl < harga) return msg.reply(`You need **${harga - dl} Diamond lock** more for buy vending`)
        
        msg.reply(`You buy **Vending manchine** and pay **${harga} Diamond lock**`)
        db.subtract(`dl_${msg.author.id}`, harga)
        db.set(`vend_${msg.author.id}`, true)
      }
    }
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}