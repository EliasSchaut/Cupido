module.exports = {
    name: 'ping',
    description: 'Get the bot\'s ping',
    aliases: ['p'],
    args: false,
    guildOnly: false,
    dmOnly: false,
    execute(message, args) {
        message.channel.send(`Websocket heartbeat: ${message.mentions.client.ws.ping}ms.`);
    },
};