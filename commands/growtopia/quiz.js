module.exports = {
  name: "quiz",
  description: "Get a quiz about growtopia",
  usage: "quiz",
  category: "growtopia",
  run: async (client, message, args) => {
                                  
    let pertanyaan = require("../../quiz.json");
    const item = pertanyaan[Math.floor(Math.random() * pertanyaan.length)];
    const filter = response => {
      return item.jawaban.some(
        jawabans => jawabans.toLowerCase() === response.content.toLowerCase()
      );
    };

    message.channel.send(item.pertanyaan + "\n" + item.pilihan.join('\n')).then(() => {
      message.channel
        .awaitMessages(filter, { 
        max: 1, 
        time: 30000, 
        errors: ["time"] 
      })
        .then(collected => {
          message.channel.send(`${collected.first().author} Congrats!`);
        })
        .catch(collected => {
          message.channel.send("No one answer :\\");
         });
    });
  }
};
module.exports.requirements = {
  ownerOnly: true,
  userPerms: [],
  clientPerms: []
};
