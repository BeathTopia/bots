
const Discord = require("discord.js");
const client = new Discord.Client();

const path = require("path");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const { VultrexDB } = require("vultrex.db");
const express = require("express");
const app = express();
const { owner, prefix, color } = require("./config.json");

app.get("/", (req, res) => {
  res.sendStatus(200)
});

app.listen(process.env.PORT);
/*nterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

require('./web/server')
const DBL = require("dblapi.js");
const dbl = new DBL("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjA5NzU1Nzc1MTAwNTE4NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkxMTUyMTc1fQ._Bv-RXlD_rrjmFXaWV_O6eDbsyTKmAMp9FoGYhKLpiU", client);

dbl.on("posted", () => {
  console.log("Posted!");
});
*/
const { GiveawaysManager } = require('discord-giveaways');

client.giveaway = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: color,
        reaction: "🎉"
    }
});

const dbs = new VultrexDB({
  provider: "sqlite",
  name: "main",
  fileNmae: "main"
});

dbs.connect().then(async () => {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.prefix = new Object();
  client.prefix["default"] = prefix;
  client.db = dbs;
  client.moderator = await dbs.get("moderator", []);
  client.staff = await dbs.get("staff", []);
  client.blacklist = await dbs.get("blacklist", []);
  client.categories = fs.readdirSync("./commands/");

  ["command"].forEach(handler => {
    require(`./structures/${handler}`)(client);
  })
  
  const events = require("./structures/event");
  events.run(client);
});

client.on("message", message => {
  try {
    if (message.author.bot) return;

    let Avatar = client.user.displayAvatarURL();
    let tagEmbed = new Discord.MessageEmbed()
      .setAuthor(
        client.user.username + " Prefix",
        client.user.displayAvatarURL()
      )
      .setColor(color).setDescription(`Global prefix: \`${
      client.prefix["default"]
    }\`
Prefix in this server: \`${
      client.prefix[message.guild.id]
        ? client.prefix[message.guild.id]
        : client.prefix["default"]
    }\`

type: \`${
      client.prefix[message.guild.id]
        ? client.prefix[message.guild.id]
        : client.prefix["default"]
    }help\` to get a list of Commands!
**[INVITE](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [SUPPORT SERVER](https://discord.gg/sG3n6RD) | [VOTE](https://top.gg/bot/${client.user.id}/vote)**`);
/*.setThumbnail(Avatar)
.setColor("RANDOM")
.setTitle(`${client.user.username} Prefix`)
.setDescription(`Prefix ku adalah \`p!\``)*/
    //if(message.mentions.users.first().id === client.user.id) {
    if (message.content.startsWith(`<@${client.user.id}>`)) {
      return message.channel.send(tagEmbed);
    }
  }catch(e){
    return;
  }
});

/*===================={ MEMBERS }==================
client.on("message", msg => {
  function url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  if (msg.author.bot) return;

  if (msg.channel.name === "growtopians") {
    let gbh = msg.content.split(" ");
    let gb = gbh.join(" ");
    msg.delete().catch();

    if (client.moderator.includes(msg.author.id)) return;
    if (client.staff.includes(msg.author.id)) return;
    if (["580640622235484161"].includes(msg.author.id)) return;

    if (url(msg.content) === true) {
      return msg
        .reply("Hey you cant send link in global-broadcast")
        .then(m => m.delete({ timeout: 5000 }));
      msg.delete();
    }

    let ch1 = new Discord.MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(gb)
      .setColor("WHITE")
      .setFooter("Broadcast from server: " + msg.guild.name);
    client.channels.cache
      .filter(x => x.name === "growtopians")
      .map(channel => channel.send(ch1));
  }
});

//=========================={ MODERATOR }=================
client.on("message", msg => {
  if (msg.author.bot) return;

  if (msg.channel.name === "growtopians") {
    let gbh = msg.content.split(" ");
    let gb = gbh.join(" ");
    msg.delete().catch();

    if (!client.moderator.includes(msg.author.id)) return;
    if (client.staff.includes(msg.author.id)) return;

    if (msg.author.id === "580640622235484161") return;

    let ch = new Discord.MessageEmbed()
      .setAuthor(
        "[MODERATOR] " + msg.author.username,
        msg.author.displayAvatarURL()
      )
      .setDescription(gb)
      .setColor(color)
      .setFooter("Broadcast From server: " + msg.guild.name);
    client.channels.cache
      .filter(x => x.name === "growtopians")
      .map(channel => channel.send(ch));
  }
});
//==========================={ CO-OWNER }=================
client.on("message", msg => {
  if (msg.author.bot) return;

  if (msg.channel.name === "growtopians") {
    let gbh = msg.content.split(" ");
    let gb = gbh.join(" ");
    msg.delete().catch();

    if (!client.staff.includes(msg.author.id)) return;
    if (msg.author.id === "580640622235484161") return;

    let ch = new Discord.MessageEmbed()
      .setAuthor(
        "[CO-OWNER] " + msg.author.username,
        msg.author.displayAvatarURL()
      )
      .setColor("ORANGE")
      .setDescription(gb)
      .setFooter(`Broadcast from server: ${msg.guild.name}`);
    client.channels.cache
      .filter(x => x.name === "growtopians")
      .map(channel => channel.send(ch));
  }
});

//=========================={ OWNER }===================
client.on("message", msg => {
  if (msg.author.bot) return;

  if (msg.channel.name === "growtopians") {
    let gbh = msg.content.split(" ");
    let gb = gbh.join(" ");

    //if(url(msg.content) === true) return msg.reply("You cant share link in here");

    msg.delete().catch();

    if (!["580640622235484161"].includes(msg.author.id)) return;

    let ch = new Discord.MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(gb)
      .setColor("BLACK")
      .setFooter("Broadcast from my developer");
    //.setImage(msg.attachements.first() ? msg.attachements.first().proxyURL : null)

    client.channels.cache
      .filter(x => x.name === "growtopians")
      .map(channel => channel.send(ch));
  }
});

//==============={ SUGGESTIONS SYSTEM ONLY 1 SERVER }=========
client.on("message", msg => {
  if (msg.author.bot) return;

  let ch = client.channels.cache.get("722027949959938148");
  if (msg.channel.name === ch.name) {
    let a = msg.content.split(" ");
    let ags = a.join(" ");

    msg.delete().catch();

    let chs = new Discord.MessageEmbed()
      .setAuthor(`${msg.author.username}`)
      .setDescription(ags)
      .setFooter(`Suggestions from: ${msg.author.tag}`)
      .setColor(color)
      .setThumbnail(msg.author.displayAvatarURL());
    ch.send(chs).then(m => {
      m.react("✅");
      m.react("❌");
    });
  }
});

//==============={ INVITE SYSTEM }===========
/*const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});*/

//======================={ ADD GUILD }===================
client.on("guildCreate", guild => {
  const guilds = client.guilds.cache.get("713203429744443475");
  const channel = guilds.channels.cache.find(
    ch => ch.id === "713480509648273489"
  );
  if (!channel) return;

  const embed = new Discord.MessageEmbed()
    .setColor(color)
    //.setDescription(`📥 **${client.user.tag}** \`mas)
    .setDescription(
      `[SYSTEM]: Someone invite **${client.user.tag}**
Name Guild: ${guild.name}
ID: ${guild.id}
Owner: ${guild.owner.user} (${guild.owner.user.tag})
Owner Id: ${guild.owner.user.id}
Total member: ${guild.memberCount}`
    )
    .setFooter(`Total guild: ${client.guilds.cache.size}`, guild.iconURL)
    .setTimestamp();
  channel.send(embed);
});

//====================={ REMOVE GUILD }===================
client.on("guildDelete", guild => {
let channel = client.channels.cache.get('713480509648273489')

  const embed = new Discord.MessageEmbed()
    .setColor(color)
    //.setDescription(`📥 **${client.user.tag}** \`masuk\` server baru **${guild.name}** (${guild.members.size}) \n(${guild.id})`)
    .setDescription(
      `[SYSTEM]: Someone kick **${client.user.tag}**
Name Guild: ${guild.name}
ID: ${guild.id}
Owner: ${guild.owner.user} (${guild.owner.user.tag})
Owner Id: ${guild.owner.user.id}
Total Member: ${guild.memberCount}`
    )
    .setFooter(`Total guild: ${client.guilds.cache.size}`, guild.iconURL)
    .setTimestamp();
  channel.send(embed);
});

client.on("message", async message => {
  if (message.channel.type === "dm") {
    var args = message.content.split(" ").slice(0);
    var args = args.slice(0).join(" ");
    if (message.content.startsWith(client.prefix))
      return message.channel.send(
        ":x: Please use commands in real server! :x:"
      );
    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) return;
    if (args.length > 1024)
      return message.reply(
        "Your message content too many characters (1024 Limit) :("
      );
    client.guilds.cache
      .get("713203429744443475")
      .channels.cache.get("718778801731010571")
      .send(`[${message.author.id}] ${message.author.tag}: ${args}`);
  }
});

client.login(process.env.TOKEN);
