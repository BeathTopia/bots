const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "backpack",
  aliases: ["bp"],
  usage: "backpack [@user]",
  category: "growtopia",
  run: async(client, msg, args) => {
    
    
    const db = require("quick.db")
const { Canvas } = require("canvas-constructor")
const superagent = require("superagent")
const fetch = require("node-fetch")

    async function createCanvas() {
      
      let usr = msg.mentions.users.first() || msg.author;
      
      let xp = await client.db.get(`level-${usr.id}`)
      
      //=================={ DATABASE WORLD LOCK }==============
      let wl = db.fetch(`wl_${usr.id}`)
      if(wl === null) wl = 0;
      if(wl > 0) wl = "https://cdn.discordapp.com/attachments/718689848256364634/719742207485280387/Worldlock.gif"
      if(wl === 0) wl = "https://cdn.discordapp.com/attachments/718689848256364634/719745981142401074/unknown.png";
      
      let wlss = db.fetch(`wl_${usr.id}`)
      if(wlss === null) wlss = 0;
      if(wlss === 0) wlss = " ";

      
      //============{ DATABASE DIAMONS LOCK }=========
      let dlss = db.fetch(`dl_${usr.id}`)
      if(dlss === null) dlss = 0;
      if(dlss === 0) dlss = " ";
      
      let dl = db.fetch(`dl_${usr.id}`)
      if(dl === null) dl = 0;
      if(dl > 0) dl = "https://cdn.discordapp.com/attachments/718689848256364634/719789277176791080/Untitled.png";
      if(dl === 0) dl = "https://cdn.discordapp.com/attachments/718689848256364634/719745981142401074/unknown.png";
      
      //==============={ DATABASE GEMS }==========
      let gm = db.fetch(`gems_${usr.id}`)
      if(gm === null) gm = 0;
      
      //==============={ DATABASE PICKAXE }===========
      let pc = db.get(`pickaxe_${usr.id}`)
      if(pc === null) pc = false;
      if(pc === false) pc = "https://cdn.discordapp.com/attachments/718689848256364634/719745981142401074/unknown.png";
      if(pc === true) pc = "https://cdn.discordapp.com/attachments/716157655512514630/720122498330394664/pickaxe-transparent-miner-3.png"
      
      //================{ DATABASE VENDING MACHINE } ==========================
      let vend = db.get(`vend_${usr.id}`)
      if(vend === null) vend = false;
      if(vend === false) vend = "https://cdn.discordapp.com/attachments/718689848256364634/719745981142401074/unknown.png";
      if(vend === true) vend = "https://cdn.discordapp.com/attachments/725040275642253383/725170941495345213/images_2.jpeg";
      
      //================={ DATABASE ORIONS SET }=========================================
      let orion = db.get(`orion_${usr.id}`)
      if(orion === null) orion = false;
      if(orion === true) orion = 'https://cdn.discordapp.com/attachments/700935494711771147/729189413501927434/Captura_de_pantalla_48.png';
      if(orion === false) orion = 'https://cdn.discordapp.com/attachments/700935494711771147/729301748090404864/unknown.png';
      
      let { body: orions } = await superagent.get(orion)
      let { body: vends } = await superagent.get(vend)
      let { body: pcs } = await superagent.get(pc)
      let { body: dls } = await superagent.get(dl)
      let { body: wls } = await superagent.get(wl)
        let { body: background } = await superagent.get("https://cdn.discordapp.com/attachments/700935494711771147/729238585928056833/Untitled.png")//https://cdn.discordapp.com/attachments/718689848256364634/720148964468457582/Untitled.png")//"https://cdn.discordapp.com/attachments/718689848256364634/719788366102528100/Untitled.png")//"https://cdn.discordapp.com/attachments/718689848256364634/719738393889865728/Untitled.png")//https://cdn.discordapp.com/attachments/718689848256364634/719520415604801696/inventory_sample.png")//https://cdn.discordapp.com/attachments/718689848256364634/719186208777044048/images_5.jpeg"); 
        let { body: avatar } = await superagent.get(usr.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        return new Canvas(1000, 600) //(1024, 450)
            .addImage(background, 0, 0, 1000, 600)
            .addImage(wls, 320, 300, 100, 100)
            .addImage(dls, 435, 300, 100, 100)
            .addImage(pcs, 550, 300, 100, 100)
            .addImage(vends, 665, 300, 100, 100)
            .addImage(orions, 430, 50, 160, 160)
      
      
            .setColor("white")
            .setShadowColor("rgba(22, 22, 22, 1)")
            .setShadowOffsetY(5)
            .setShadowBlur(10)
            .setTextFont("bold 30px sans-serif")
            .addText(wlss, 320, 395)
            .addText(dlss, 440, 395)
            .addText(gm, 15, 120)
            .addText(usr.username, 450, 40)
            .setTextAlign('center')
      
            .toBufferAsync()

      }
  
      msg.channel.send(``, {
        files: [{
            attachment: await createCanvas(),
            name: "backpack.png"
          }]
      });
    
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}