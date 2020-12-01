const { MessageEmbed } = require('discord.js')
const { color } = require('../../config.json')
module.exports = {
  name: 'server-info',
  aliases: ['si'],
  category: 'info',
  description: 'get information server',
  usage:　'server-info',
  run: async(client, msg, args) => {
    
    const pm = require('pretty-ms');

let now = Date.now();
let createdAt = msg.guild.createdTimestamp;
let age = now - createdAt;
    
    let embed = new MessageEmbed()
    .setAuthor(msg.guild.name+' info!', msg.author.displayAvatarURL())
    .setThumbnail(msg.guild.iconURL())
    .addField('OWNER', msg.guild.owner.user.tag + ` (${msg.guild.owner.user.id}`)
    .addField("SERVER NAME", msg.guild.name + ` (${msg.guild.id}`)
    .addField('MEMBER', client.guilds.cache.get(msg.guild.id).members.cache.filter(m => !m.user.bot).size + ' MEMBERS')
    .addField('BOT', client.guilds.cache.get(msg.guild.id).members.cache.filter(m => m.user.bot).size + ' BOTS')
    .addField('TOTAL', msg.guild.memberCount + ' USERS')
    .addField('ROLE', msg.guild.roles.cache.map(r => r))
    .addField('AGE SERVER', pm(age, {verbose: true}))
    .addField('CREATED AT', msg.guild.createdAt)
    .setColor(color)
    msg.channel.send(embed)
  }
}
module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}