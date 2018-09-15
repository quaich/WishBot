const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

//Import config
const { prefix, discordtoken, osutoken } = require('./config.json');

//Import commmands
client.commands = new Discord.Collection();

//Parse commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

//Log in
client.login(discordtoken)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
console.log(prefix)

//parse message
client.on('message', msg => {

  if(msg.author.bot) return; //ignore self

  if(msg.content.indexOf(prefix) !== 0) return; //ignore blank commands

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  if (!client.commands.has(commandName)){
    msg.channel.send("Command not found!")
  } else {
      const command = client.commands.get(commandName);
      try {
        command.execute(msg, args, prefix);
      }
      catch (error) {
          console.error(error);
          msg.reply('there was an error trying to execute that command!');
      }
  };
});

