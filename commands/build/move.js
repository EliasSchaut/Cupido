module.exports = {
    name: 'move',
    description: 'Move members from one channel to another',
    aliases: ['transfer', 'shift', 'relocate'],
    args: true,
    args_min_length: 2,
    usage: '[from channel_id] [to channel_id]',
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    execute(message, args) {

    },
};