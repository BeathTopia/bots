const Discord = require("discord.js")
const fetch = require("node-fetch")
//const growbot = require('growbot-api.js')

const { color } = require("../../config.json")
const moment = require("moment-timezone")

module.exports = {
  name: "wotd",
  aliases: ["event", "grow-event"],
  category: "growtopia",
  usage: "<prefix>wotd",
  description: "check event in growtopia game",
  run: async(client, message, args) => {
  
  /*  var index = moment.tz(Date.now(), 'America/New_York').day()
      var date = moment.tz('America/New_York')
      var comet = ''
      var cmetTime = moment.tz([date.years(), date.months(), 28], 'America/New_York').diff(date)
      if (cmetTime > 0) {
        var days = Math.floor(cmetTime / (1000 * 60 * 60 * 24))
        var hours = Math.floor(cmetTime / (1000 * 60 * 60) % 24)
        var mins = Math.floor(cmetTime / (1000 * 60) % 60)
        var secs = Math.floor(cmetTime / (1000) % 60)
        comet = 'Coming in ' + (days > 0 ? days + ' days, ' : '') + (hours > 0 ? hours + ' hours, ' : '') + (mins > 0 ? mins + ' minutes' + (secs > 0 ? ' and ' : ', ') : '') + (secs > 0 ? secs + ' seconds' : '') + '.'
      } else {
        if (date.date() === 28) comet = 'Currently ongoing'
        else {
          cmetTime = moment.tz([(date.months() === 10 ? date.years() + 1 : date.years()), (date.months() === 10 ? 0 : date.months()), 28], 'America/New_York').diff(date)
          days = Math.floor(cmetTime / (1000 * 60 * 60 * 24))
          hours = Math.floor(cmetTime / (1000 * 60 * 60) % 24)
          mins = Math.floor(cmetTime / (1000 * 60) % 60)
          secs = Math.floor(cmetTime / (1000) % 60)
          comet = 'Coming in ' + (days > 0 ? days + ' days, ' : '') + (hours > 0 ? hours + ' hours, ' : '') + (mins > 0 ? mins + ' minutes' + (secs > 0 ? ' and ' : ', ') : '') + (secs > 0 ? secs + ' seconds' : '') + '.'
        }
      }
    
    /*
    var https = require('https')
      https.get('https://growtopiagame.com/detail', (res) => {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', (chunk) => {
          rawData += chunk
        });
      
        var data = JSON.parse(rawData)
            var wotd = data['world_day_images']['full_size'].substr(data['world_day_images']['full_size'].indexOf('worlds/') + 'worlds/'.length).replace('.png', '')
            })*/
    
    let url = "https://growtopiagame.com/detail"
    let a = await fetch(url).then(url => url.json());
    let wtd = a["world_day_images"]["full_size"].replace("https://www.growtopiagame.com/worlds/", "").replace(".png", "").toUpperCase()
    let wotd = a["world_day_images"]["full_size"]
    let embed = new Discord.MessageEmbed()
    .setAuthor(`World Of The Day : ${wtd}`)
    .setColor(color)
   // .addField("a", a["world_day_images"]["full_size"])
    .setImage(wotd)
    .setFooter(`${client.user.username} | Beath`, client.user.displayAvatarURL())
    message.channel.send(embed)
    /*
    message.reply("Seomthing error in api growtopia")*/
  }
}

module.exports.requirements = {
  ownerOnly: false,
  userPerms: [],
  clientPerms: []
}