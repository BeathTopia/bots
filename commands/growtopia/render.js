const Discord = require("discord.js");
const test = require("../../config.json");
const fetch = require("node-fetch")
const superagent = require("superagent");

module.exports = {
  name: "render",
  aliases: ["render-world", "world"],
  description: "render world in growtopia",
  usage: test.prefix + "render <name world in growtopia",
  category: "growtopia",
  run: async (client, message, args) => {
    try{
  let world = args.join(" ");
  let world1 = world.toUpperCase();
  if (!world) return message.reply(`Is the world you are looking for rendered already?`);
    
  let url = `https://s3.amazonaws.com/world.growtopiagame.com/${world}.png`;
  let { body } = await superagent.get(url)
  if(!body) return message.reply("not found")
    
  let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
    .setDescription(`>WORLD NAME: **${world1}**`)
    .setImage(url)
    .setColor(test.color)
    .setFooter(`${world1}`, client.user.displayAvatarURL())
    .setTimestamp();
  message.channel.send(embed).then(m => {
            m.react('♥️');
    });
  }catch(e){
    let world = args[0];
    message.reply("**" + world + "** world is not found")
  }
  }
  }
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}