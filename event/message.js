const { owners } = require('../config.json')
const db = require("quick.db")

module.exports = async (client, message) => {
  if(!message.guild || message.author.bot) return;
 
 if(["713346529011957820"].includes(message.author.id)) return;
  
  if(!client.prefix[message.guild.id]) {
    client.prefix[message.guild.id] = await client.db.get(`prefix-${message.guild.id}`, client.prefix["default"]);
  }
 // console.log(client.prefix[message.guild.id]);
/*  
 let channel = db.get(`levels_${message.guild.id}`)
  let ch = client.channels.cache.get(channel)
  
  let conf = db.get(`level_${message.guild.id}`)
  if(conf === null) conf = false;
  if(conf === false) return;
  
  if(conf === true) {
  const levelinfo = await client.db.get(`level-${message.author.id}`, {
    level: 1,
    xp: 0,
    totalxp: 0
  });
  
  const generatedxp = Math.floor(Math.random() * 5);
  levelinfo.xp += generatedxp;
  levelinfo.totalxp += generatedxp;
  
  if (levelinfo.xp >= levelinfo.level * 40) {
    levelinfo.level++;
    levelinfo.xp = 0;
    message.channel.send(`**${message.author.tag}**, Congratulations your level is up to **${levelinfo.level}**`).then(m => m.delete({timeout: 3000}));
  }
  await client.db.set(`level-${message.author.id}`, levelinfo)
  }*/
  
  const args = message.content.split(/ +/g);
  const command = args.shift().slice(client.prefix[message.guild.id].length).toLowerCase();
  const cmd = client.commands.get(command) || client.aliases.get(command);
  
  if(!message.content.toLowerCase().startsWith(client.prefix[message.guild.id])) return;
  
  if(!cmd) return;
if (!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) return;
  
 if(cmd.requirements.ownerOnly && !owners.includes(message.author.id))
    return message.reply('Sorry you can\'t run this commands');
  
  if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
    return message.reply(`you dont have permissions: ${missingPerms(message.member, cmd.requirements.userPerms)}`)
  
  if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.userPerms))
    return message.reply(`im no have permissions: ${missingPerms(message.guild.me, cmd.requirements.clientPerms)}`);
  
  cmd.run(client, message, args);
}

const missingPerms = (member, perms) => {
  
  const missingPerms = member.permissions.missing(perms)
  .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
  
  return missingPerms.length > 1 ?
    `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1)[0]}` :
  missingPerms[0];
  
}//