let ids = require("../../js/id_safe").ids

module.exports = {
    name: 'stop',
    description: 'Move everyone back to lobby',
    aliases: ['quit', 'exit', 'abort', 'back', 'return'],
    args: false,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {
        if (!ids.initiated) {
            return message.channel.send("Channels are not initialised. There is nothing to delete!")
        }

        for (let i = 0; i < ids.shuffle_ids.length; i++) {
            const channel = await message.guild.channels.cache.get(ids.shuffle_ids[i]);

            for (const member of channel.members) {
                await member[1].voice.setChannel(ids.lobby);
            }
            await channel.delete();
        }

        ids.shuffle_ids = [];
        message.channel.send("shuffle successfully stoped!")
    },
};
