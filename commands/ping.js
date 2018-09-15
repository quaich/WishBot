module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args, prefix) {
        msg.channel.send('Pong.');
    },
};