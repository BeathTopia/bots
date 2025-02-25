const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "event");

module.exports.run = (client) => {
 const eventFiles = readdirSync(filePath);
  
  for (const eventFile of eventFiles) {
    const event = require(`${filePath}/${eventFile}`);
    const eventName = eventFile.split('.').shift();
    client.on(eventName, event.bind(null, client));
    
  }
  console.log(`loaded ${eventFiles.length} events!`)
  
};