module.exports = {
    name: 'echo',
    description: 'Sends back your arguments.',
    aliases: ['echos'],
    args: true,
    usage: '[text]',
    guildOnly: false,
    dmOnly: false,
    execute(message, args) {
        message.channel.send(`${args}`);
    },
};