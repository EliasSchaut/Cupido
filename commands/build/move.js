module.exports = {
    name: 'move',
    description: 'Move members from one channel to another.',
    aliases: ['transfer', 'shift', 'relocate'],
    args: true,
    args_min_length: 2,
    usage: '[from channel_id] [to channel_id]',
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {
        const from_channel = await message.guild.channels.cache.get(args[0]);
        const to_channel = await message.guild.channels.cache.get(args[1]);

        // check existence
        if ((from_channel === "undefined") || (to_channel === "undefined")) {
            return message.channel.send("The specified IDs must be from existing voice channels!");
        }

        // check
        if ((from_channel.type !== "voice") || (to_channel.type !== "voice")) {
            return message.channel.send("The specified IDs must be from voice channels!");
        }

        // move
        for (const member of from_channel.members) {
            await member[1].voice.setChannel(to_channel);
        }
        message.channel.send("All members moved!");
    },
};