const inspect = require('util').inspect
const db = require("quick.db");
const dbs = require("vultrex.db")
const fs = require("fs")
const axios = require('axios')
const fetch = require("node-fetch")
const Discord = require('discord.js');
const c = require("../../config.json")
const clean = input => {
    const output = typeof input === 'string' ? input : inspect(input);
    return output.replace(/(@|`)/g, '$1\u200b');
};

module.exports = {
  name: "eval",
  aliases: ["ev"],
  category: "developer",
  description: "eval the code.js",
  usage: c.prefix + "ev [code.js]",
  run: async (client, msg, args) => {
  
    function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
    
    let input = args.join(' ');
    if (!input) {
        (await msg.channel.send("error")).delete({timeout: 10000});
    }
  if (input.toLowerCase().includes('bot.token')) input = msg.reply('GK BOLEH NGAMBIL TOKEN DI SINI GOBLOK!')
    
    args = args.join(" ");
    try {
        var evaled = eval(args);
        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);
   /* const options = {
      method: "POST",
      body: `${clean(evaled)}`,
      headers: {
        "Content-Type": "application/json"
      }
    };

    let res = await fetch(`https://hastebin.com/documents`, options);
    res = await res.json();

    message.channel.send(`:white_check_mark: | Posted text to Hastebin at this URL: https://hastebin.com/${res.key}`)
    */    msg.channel.send(`\`\`\`javascript\n${clean(evaled)}\n\`\`\``);
    } catch (err) {
        msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
}

module.exports.requirements = {
  ownerOnly: true,
  userPerms: [],
  clientPerms: []
}