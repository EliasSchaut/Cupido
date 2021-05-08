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
            return message.channel.send("Channels are not initialised. There is nothing to delete!")
        }

        for (let i = 0; i < ids.shuffle_ids.length; i++) {
            await message.guild.channels.cache.get(ids.shuffle_ids[i]).delete();
        }

        const lobby = await message.guild.channels.cache.get(ids.lobby);
        const category = await message.guild.channels.cache.get(ids.category);
        await lobby.delete();
        await category.delete();

        ids.initiated = false;
        ids.shuffle_ids = [];
        message.channel.send("Channels successfully destroyed!")
    },
};