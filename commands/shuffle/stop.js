let ids = require("../../js/id_safe").ids

module.exports = {
    name: 'stop',
    description: 'Move every user back from the new voice channels to lobby and delete the new voice channels (except lobby and the category).',
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

                // avoid moving a left user
                try {
                    await member[1].voice.setChannel(ids.lobby);
                } catch (e) {
                    console.log(`Member ${member.user.username} could not moved to lobby`)
                }
            }
            await channel.delete();
        }

        ids.shuffle_ids = [];
        message.channel.send("shuffle successfully stopped!")
    },
};
