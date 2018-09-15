module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args) {
        message.channel.send('Pong.');
    },
};