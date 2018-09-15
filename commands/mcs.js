module.exports = {
    name: 'mcs',
    description: 'Gets Minecraft server status from mcapi.us',
    execute(msg, args, prefix) {
      const getJSON = require('get-json')
      var url = ("https://mcapi.us/server/status?ip="+args[0]);
      getJSON(url, function(error,response)
      {
            console.log("User paged "+args[0]+" MCServer status.")
            if (response.online===true)
            {
              msg.channel.send("Minecraft server @ "+ args[0] + " is online! :white_check_mark:\n```"+ response.motd+"```\nIt currently has " + response.players.now + "/" + response.players.max + " players online.")
            }
            else
            {
              if (response.last_online)
              {
                  var dayssinceonline = Math.round((((new Date()).getTime()) - response.last_updated)/(60*60*24));
                  msg.channel.send("Minecraft server @ "+args[0] + " is offline! :anger:\nIt was last recorded online " + dayssinceonline +" days ago.");
              }
              else
              {
                msg.channel.send("Minecraft server @ "+args[0] + " is offline! :anger:\nAccording to MCApi's records this server has never been online. :sob:");
              }
            }
      });
    },
};