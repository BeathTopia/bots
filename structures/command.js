const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");

const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading(`Command`, "Status ✅ | ✖️");

module.exports = (client, message, args) => {
    
    readdirSync("./commands/").forEach(dir => {
        
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅ Berhasil');
            } else {
                table.addRow(file, `❌  -> ada yang terlupakan help.name, atau help.name itu bukan sebuah string.`);
                continue;
            }
  
           if (pull.aliases) for (const alias of pull.aliases) {
             client.aliases.set(alias, pull)
           };
        }
    });
    
    console.log(table.toString());
}
  /*or (const ctg of readdirSync(filePath).filter(ctg => ctg.endsWith("/")))
    for (const cmd of readdirSync(filePath).filter(cmd => cmd.endsWith(".js"))) {
        const prop = require(`${filePath}/${cmd}`);
        client.commands.set(prop.help.name, prop);
    }
    console.log(`Loaded ${client.commands.size} commands.`);
*/