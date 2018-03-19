const Discord = require('discord.js');
const getJSON = require('get-json')
const client = new Discord.Client();
const token = 'tokenhere';
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
    if (args[0] === "mcs")
     {
       msg.channel.send("This prints a message with informaion about the target minecraft server.\nUsage: !mcs <ipaddress>:[port]");
     }
     else
     {
       msg.channel.send("Help for Wishbot:\n- help: Displays this message.\n- mcs: Displays information about a target minecraft server. Usage: !mcs <ipaddress>:[port]")
     }
  }
  if (command === "mcs")
  {
      var url = ("https://mcapi.us/server/status?ip="+args[0]);
      getJSON(url, function(error,response)
      {
            if (response.online===true)
            {
              msg.channel.send(args[0] + " is online! :white_check_mark:\n```"+ response.motd+"```\nIt currently has " + response.players.now + "/" + response.players.max + " players online.")
            }
            else
            {
              if (response.last_online)
              {
                  var dayssinceonline = Math.round((((new Date()).getTime()) - response.last_updated)/(60*60*24));
                  msg.channel.send(args[0] + " is offline! :anger:\nIt was last recorded online " + dayssinceonline +" days ago.");
              }
              else
              {
                msg.channel.send(args[0] + " is offline! :anger:\nAccording to MCApi's records this server has never been online. :sob:");
              }
            }
      });
  }
});

client.login(token);
