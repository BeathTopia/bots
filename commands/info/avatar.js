const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "avatar",
  aliases: ["av"],
  usage: "avatar [@user]",
  category: "info",
  run: async(client, msg, args) => {
    
    
    const db = require("quick.db")
const { Canvas } = require("canvas-constructor")
const superagent = require("superagent")
const fetch = require("node-fetch")

    async function createCanvas() {
      
      let usr = msg.mentions.users.first() || msg.author;
      
      let wl = db.fetch(`wl_${usr.id}`)
      if(wl === null) wl = 0;
      
      let dl = db.fetch(`dl_${usr.id}`)
      if(dl === null) dl = 0;
      
      let gm = db.fetch(`gems_${usr.id}`)
      if(gm === null) gm = 0;
      
        let { body: background } = await superagent.get("https://cdn.discordapp.com/attachments/718689848256364634/719186208777044048/images_5.jpeg"); 
        let { body: avatar } = await superagent.get(usr.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        return new Canvas(500, 500) //(1024, 450)
            .addImage(avatar, 0, 0, 500, 500) // BACKGROUN
            .toBufferAsync()

      }
  
      msg.channel.send(``, {
        files: [{
            attachment: await createCanvas(),
            name: "avatar.png"
          }]
      });
    
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}