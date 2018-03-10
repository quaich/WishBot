const Discord = require('discord.js');
const getJSON = require('get-json')
const client = new Discord.Client();
const token = '';
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.content.indexOf("!") !== 0) return;
  const args = msg.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "help")
  {
    if (args[0] === "mcping")
     {
       msg.channel.send("This prints a message with informaion about the ip's minecraft server.\nUsage: !mcping <ipaddress>");
     }
  }
  if (command === "replywith")
  {
    msg.reply("Here's what you posted:" + args[0]);
  }
  if (command === "mcping")
  {
      var url = ("https://mcapi.us/server/status?ip="+args[0]);
      getJSON(url, function(error,response)
      {
            if (response.online===true)
            {
              var timeonline = [response.duration/(60*60*24*28),response.duration/(60*60*24),response.duration/60*60,response.duration/60];
              msg.channel.send(args[0] + " is online! :white_check_mark:\nIt currently has " + response.players.now + "/" + response.players.max + " players online.")
            }
            else
            {
              if (response.last_updated)
              {
                  var dayssinceonline = Math.round((((new Date()).getTime()) - response.last_updated)/(60*60*24));
                  msg.channel.send(args[0] + " is offline! :anger:\nIt was last recorded online " + dayssinceonline +" days ago.");
              }
              else
              {
                msg.channel.send(args[0] + " is offline! :anger:\nAccording to our records this server has never been online. :sob:");
              }
            }
      });
  }
});

client.login(token);