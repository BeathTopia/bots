const Discord = require("discord.js")
const c = require("../../config.json")

module.exports = {
    name: "help",
    aliases: ["h", "command"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "help [command]",
    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()
        .setTitle('TORIONS COMMANDS LIST')
        .setDescription(`${message.author} Hello how can i help you? There's have **40** Commands are available`)
        .addField('🔨┋Moderation', '`kick`|`ban`|`mute`|`nuke`|`purge`')
        .addField('💵┋Ecoonomy', '`backpack`|`bfg`|`buy`|`daily`|`deposit`|`exchange`|`inventory`|`pay`|`profile`|`quiz`|`rob`|`shop`|`take`|`vend`|`work`')
        .addField('🎉┋Giveaway', '`gstart`|`greroll`|`gend`')
        .addField('🎥┋Growtopia', '`render`|`gtstats`|`wotd`')
        .addField('💎┋Info', '`avatar`|`botinfo`|`help`|`server-avatar`|`server-info`|`userinfo`')
        .addField('<:server:769013211801714748>┋Private Server', '`up`|`down`|`announcement`')
        .addField('📜┋Utility', '`changelog`|`report`|`suggestion`|`meme`')
        .addField('🔗┋Developer', '`add`|`eval`|`give`')
        .setTimestamp()
        .addField("**Link**:", `**[INVITE](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [SUPPORT SERVER](https://discord.gg/sG3n6RD) | [VOTE](https://top.gg/bot/${client.user.id}/vote)**`)
        .setFooter("© Torions GT | Made by : Beath#1000")
        .setThumbnail(message.author.displayAvatarURL({dynamic:true, size: 4096}))
        .setColor(0xff0000);
        message.channel.send(embed);
    }
}

module.exports.requirements = {
    ownerOnly: false,
    userPerms: [],
    clientPerms: []
  }