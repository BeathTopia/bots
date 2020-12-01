const db = require("quick.db")
const { Canvas } = require("canvas-constructor")
const superagent = require("superagent")
const fetch = require("node-fetch")

module.exports = {
  name: "profile",
  aliases: ["pf"],
  description: "check your profile",
  usage: "profile [@user]",
  category: "growtopia",
  run: async(client, msg, args) => {

    async function createCanvas() {
      
      let usr = msg.mentions.users.first() || msg.author;
      
      let wl = db.fetch(`wl_${usr.id}`)
      if(wl === null) wl = 0;
      
      let dl = db.fetch(`dl_${usr.id}`)
      if(dl === null) dl = 0;
      
      let gm = db.fetch(`gems_${usr.id}`)
      if(gm === null) gm = 0;
      
        let { body: background } = await superagent.get("https://cdn.discordapp.com/attachments/713506938507362425/719195337822175383/20200607_212344.jpg")//"https://cdn.discordapp.com/attachments/718689848256364634/719186208777044048/images_5.jpeg"); 
        let { body: avatar } = await superagent.get(usr.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        return new Canvas(1000, 500) //(1024, 450)
            .addImage(background, 0, 0, 1000, 500) // BACKGROUN
            .setShadowColor("rgba(22, 22, 22, 1)")
            .setShadowOffsetY(5)
            .setShadowBlur(10)
            .setColor(`white`)
            .addCircle(150, 140, 115)
            .addCircularImage(avatar, 150, 140, 110) // PROFILE
      
           .setTextFont("bold 50px sans-serif'")
      //.setTextAlign("center")
      .setColor("white")
      .addText("WORLD LOCK: " + wl, 210, 300)
      .addText("DIAMOND LOCK: "+dl, 210, 375)
      .addText("GEMS: "+gm.toLocaleString(), 210, 450)
      /*
            .setTextFont("bold 40px sans-serif'")
            .setTextAlign("center")
            .addText(`${username}#${member.user.discriminator}`, 500, 435) 

            .setTextFont("bold 75px sans-serif")
            .setTextAlign("center")
            .addText("WELCOME", 500, 385) 

            .setTextFont("bold 30px sans-serif")
            .setTextAlign("center")
            .addText(`${member.guild.name}`, 500, 475) */
            .toBufferAsync()

      }
  
      msg.channel.send(``, {
        files: [{
            attachment: await createCanvas(),
            name: "profile.png"
          }]
      });
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}