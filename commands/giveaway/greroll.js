const ms = require('ms')

module.exports = {
  name: 'greroll',
  description: 'reroll giveaway',
  usage: 'greroll [id message]',
  category: 'giveaway',
  run: async(client, message, args) => {

    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    let giveaway = 
    client.giveaway.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveaway.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Im not find a giveaway for `'+ args.join(' ') +'`.');
    }

    client.giveaway.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('Giveaway rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
            message.channel.send('This giveaway is not ended!');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });

}
    
  }

module.exports.requirements = {
  ownerOnly: false,
  userPerms: ['MANAGE_MESSAGES'],
  clientPerms: []
}