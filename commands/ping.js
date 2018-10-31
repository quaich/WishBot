module.exports = {
    name: "ping",
    description: "Ping!",
    execute(msg, args, prefix) {
    	console.log("User requested ping time:" + (new Date().getTime() - msg.createdTimestamp));
		msg.channel.send("Pong! " + (new Date().getTime() - msg.createdTimestamp) + "ms");

    },
};