const { MessageEmbed } = require("discord.js")
const { color, owners } = require("../../config.json");

module.exports = {
  name: "botinfo",
  category: "info",
  descriptrion: "check bot info",
  usage: "botinfo",
  aliases: ["stats", "bot", "info"],
  run: async(client, msg, args) => {
    
    const Discord = require('discord.js')
let cpuusage = process.cpuUsage();
const c = require("../../config.json");
let cpu = (cpuusage.user/cpuusage.system).toFixed(2) + "%";
const os = require("os");
 
 try{
  function parseDur(ms) {
  let S = ms / 1000;
 
  let D = parseInt(S / 86400);
  S = S % 86400;
 
  let H = parseInt(S / 3600);
  S = S % 3600;
 
  let M = parseInt(S / 60);
  S = parseInt(S % 60);
 
  if (S || M || H || D) return `${D}d ${H}h ${M}m ${S}s`;
    }
    
       let own = client.users.cache.get('620532398828027935')
       
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(client.user.username + ' Info')
.setDescription(`**BOT INFO**
\`\`\`
Owner        :: ${own.tag}
Channels     :: ${client.channels.cache.size.toLocaleString()}
Servers      :: ${client.guilds.cache.size.toLocaleString()}
Users        :: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
Giveaway On  :: ${client.giveaway.giveaways.filter((g) => !g.ended).length}
all Giveaway :: ${client.giveaway.giveaways.length}\`\`\`
**BOT SYSYEM**
\`\`\`
CPU         :: ${os.cpus().map(i => `${i.model}`)[0]}
Discord.js  :: ${Discord.version}
Platform    :: ${os.platform}
Node        :: ${process.version}
Mem Usage   :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} mb
CPU usage   :: ${cpu}
Uptime      :: ${parseDur(client.uptime)}\`\`\``)
    .setFooter(`This bot made by: ${client.user.username}`)
    .setTimestamp()
        return msg.channel.send(embed);
    } catch (err) {
        console.log(err)
    }
  }
}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}