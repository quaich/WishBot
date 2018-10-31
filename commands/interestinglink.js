module.exports = {
    name: "interestinglink",
    description: "Sends a nice news story from https://reddit.com",
    execute(msg, args, prefix) {
        msg.channel.send("Here's your interesting story for the day!: <https://www.youtube.com/watch?v=6n3pFFPSlW4>");
    },
};