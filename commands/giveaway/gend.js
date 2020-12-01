module.exports = {
  name: 'gend',
  description: 'ending giveaway',
  usage: 'gend [message id]',
  category: 'giveaway',
  run: async(client, message, args) => {
 
const ms = require('ms');

    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    let giveaway = 
    client.giveaway.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveaway.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    client.giveaway.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('Giveaway will end in less than '+(client.giveaway.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send('This giveaway is already ended!');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });

}   
    
  }
module.exports.requirements = {
  ownerOnly: false,
  userPerms:['MANAGE_MESSAGES'],
  clientPerms:[],
}