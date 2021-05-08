let ids = require("../../js/id_safe").ids

module.exports = {
    name: 'destroy',
    description: 'Destruct all channels',
    aliases: ['kill', 'destruction', 'genocide'],
    args: false,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {
        if (!ids.initiated) {
            return message.channels
        }

        for (const id in ids.shuffle_ids) {
            const channel = await message.guild.channels.cache.get(id);
            await channel.delete();
        }

        const lobby = await message.guild.channels.cache.get(ids.lobby);
        await lobby.delete();

        const category = await message.guild.channels.cache.get(ids.category);
        await category.delete();

        ids.initiated = false;
        message.channel.send("Channels successfully destroyed")
    },
};