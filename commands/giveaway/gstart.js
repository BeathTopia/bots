const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const Discord = require("discord.js")
const c = require("../../config.json"); 

module.exports = {
  name: 'gstart',
  description: 'starting giveaway',
  usage: 'gstart [#channel] [duration] [total winners] [prize]',
  category: 'giveaway',
  run: async(client, msg, args) => {
    
    let ch = msg.mentions.channels.first();
    if(!ch) {
		let x = new MessageEmbed()
		.setDescription('<:no:768994814527143986> **Usage:** gstart [#channel] [duration] [total winners] [prize]')
		.setColor(c.color);
		return msg.channel.send(x)
	}
    
    let duration = args[1];
    if(!duration || isNaN(ms(duration))) {
		let y = new MessageEmbed()
		.setDescription('<:no:768994814527143986> **Usage:** gstart [#channel] [duration] [total winners] [prize]')
		.setColor(c.color);
		return msg.channel.send(y)
	}
  
    let win = args[2]
    if(isNaN(win) || (parseInt(win) <= 0) || !win) {
		let z = new MessageEmbed()
		.setDescription('<:no:768994814527143986> **Usage:** gstart [#channel] [duration] [total winners] [prize]')
		.setColor(c.color);
		return msg.channel.send(z)
	}
    
    let prize = args.slice(3).join(' ');
    // If no prize is specified
    if(!prize) {
		let g = new MessageEmbed()
		.setDescription('<:no:768994814527143986> **Usage:** gstart [#channel] [duration] [total winners] [prize]')
		.setColor(c.color);
		return msg.chnnel.send(g)
	}

    client.giveaway.start(ch, {
        // The giveaway duration
        time: ms(duration),
        // The giveaway prize
        prize: prize,
        // The giveaway winner count
        winnerCount: win,
        // Who hosts this giveaway
        hostedBy: true ? msg.author : null,
        // Messages
        messages: {
            giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: "Congratulations, {winners}! You won **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    })
    
    msg.channel.send(`Giveaway start in ${ch}`)
  }
}
module.exports.requirements = {
  ownerOnly:false,
  userPerms: ['MANAGE_MESSAGES'],
  clientPerms:[]
}